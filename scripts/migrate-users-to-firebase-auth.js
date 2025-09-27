const admin = require("firebase-admin");
require("dotenv").config();

// Inicializar Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
}

async function migrateUsersToFirebaseAuth() {
  try {
    console.log("🔄 Iniciando migración de usuarios a Firebase Auth...");

    const firestore = admin.firestore();

    // Obtener usuarios de Firestore
    const usersSnapshot = await firestore.collection("users").get();
    console.log(`📊 Usuarios encontrados en Firestore: ${usersSnapshot.size}`);

    // Obtener usuarios existentes en Firebase Auth
    const authUsers = await admin.auth().listUsers();
    const existingEmails = authUsers.users.map((u) => u.email);
    console.log(
      `🔐 Usuarios existentes en Firebase Auth: ${existingEmails.length}`
    );

    const usersToMigrate = [];
    const migrationResults = [];

    // Identificar usuarios que necesitan migración
    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.email && !existingEmails.includes(userData.email)) {
        usersToMigrate.push({
          id: doc.id,
          ...userData,
        });
      }
    });

    console.log(`\n📋 Usuarios a migrar: ${usersToMigrate.length}`);

    if (usersToMigrate.length === 0) {
      console.log(
        "✅ No hay usuarios que migrar. Todos ya están en Firebase Auth."
      );
      return;
    }

    // Migrar cada usuario
    for (const user of usersToMigrate) {
      try {
        console.log(`\n🔄 Migrando usuario: ${user.email}`);

        // Crear usuario en Firebase Auth
        const userRecord = await admin.auth().createUser({
          email: user.email,
          emailVerified: user.emailVerified || false,
          displayName: user.name || user.displayName,
          // No podemos migrar la contraseña, el usuario tendrá que resetearla
        });

        console.log(
          `   ✅ Usuario creado en Firebase Auth con UID: ${userRecord.uid}`
        );

        // Actualizar el documento en Firestore con el nuevo UID
        await firestore.collection("users").doc(user.id).update({
          uid: userRecord.uid,
          migratedAt: new Date(),
          migrationSource: "nextauth-to-firebase-auth",
        });

        console.log(`   ✅ Documento actualizado en Firestore`);

        migrationResults.push({
          email: user.email,
          oldUid: user.uid,
          newUid: userRecord.uid,
          status: "success",
        });
      } catch (error) {
        console.error(`   ❌ Error migrando ${user.email}:`, error.message);
        migrationResults.push({
          email: user.email,
          oldUid: user.uid,
          status: "error",
          error: error.message,
        });
      }
    }

    // Resumen de migración
    console.log("\n📊 Resumen de migración:");
    const successful = migrationResults.filter((r) => r.status === "success");
    const failed = migrationResults.filter((r) => r.status === "error");

    console.log(`   ✅ Migrados exitosamente: ${successful.length}`);
    console.log(`   ❌ Fallaron: ${failed.length}`);

    if (successful.length > 0) {
      console.log("\n✅ Usuarios migrados exitosamente:");
      successful.forEach((user) => {
        console.log(`   - ${user.email} (UID: ${user.newUid})`);
      });
    }

    if (failed.length > 0) {
      console.log("\n❌ Usuarios que fallaron:");
      failed.forEach((user) => {
        console.log(`   - ${user.email}: ${user.error}`);
      });
    }

    console.log("\n📝 Nota importante:");
    console.log(
      "   Los usuarios migrados necesitarán usar 'Olvidé mi contraseña'"
    );
    console.log("   para establecer una nueva contraseña en Firebase Auth.");
  } catch (error) {
    console.error("❌ Error durante la migración:", error);
  }
}

migrateUsersToFirebaseAuth();
