const admin = require("firebase-admin");
require("dotenv").config();

// Inicializar Firebase Admin usando las variables de entorno existentes
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

async function checkFirebaseUsers() {
  try {
    console.log("🔍 Verificando usuarios en Firebase Auth...");

    // Listar usuarios de Firebase Auth
    const listUsersResult = await admin.auth().listUsers();
    console.log(
      `📱 Usuarios en Firebase Auth: ${listUsersResult.users.length}`
    );

    // Mostrar información de cada usuario
    listUsersResult.users.forEach((userRecord, index) => {
      console.log(`\n👤 Usuario ${index + 1}:`);
      console.log(`   UID: ${userRecord.uid}`);
      console.log(`   Email: ${userRecord.email}`);
      console.log(`   Email Verificado: ${userRecord.emailVerified}`);
      console.log(
        `   Proveedor: ${userRecord.providerData[0]?.providerId || "email/password"}`
      );
      console.log(`   Creado: ${userRecord.metadata.creationTime}`);
    });

    // Verificar usuarios en Firestore
    console.log("\n🗄️ Verificando usuarios en Firestore...");
    const firestore = admin.firestore();
    const usersSnapshot = await firestore.collection("users").get();

    console.log(`📊 Usuarios en Firestore: ${usersSnapshot.size}`);

    const firestoreUsers = [];
    usersSnapshot.forEach((doc) => {
      const data = doc.data();
      firestoreUsers.push({
        uid: data.uid,
        email: data.email,
        source: data.password ? "web-nextauth" : "mobile-firebase",
      });
    });

    console.log("\n📋 Resumen:");
    console.log(`   Firebase Auth: ${listUsersResult.users.length} usuarios`);
    console.log(`   Firestore: ${usersSnapshot.size} usuarios`);

    // Identificar usuarios duplicados y no migrados
    const firebaseAuthEmails = listUsersResult.users.map((u) => u.email);
    const firestoreEmails = firestoreUsers.map((u) => u.email);

    const duplicates = firebaseAuthEmails.filter((email) =>
      firestoreEmails.includes(email)
    );

    const unmigratedUsers = firestoreUsers.filter(
      (user) => !firebaseAuthEmails.includes(user.email)
    );

    if (duplicates.length > 0) {
      console.log(`\n✅ Emails sincronizados: ${duplicates.length}`);
      duplicates.forEach((email) => console.log(`   - ${email}`));
    }

    if (unmigratedUsers.length > 0) {
      console.log(`\n❌ Usuarios NO migrados: ${unmigratedUsers.length}`);
      unmigratedUsers.forEach((user) => {
        console.log(`   - ${user.email} (UID: ${user.uid})`);
      });
    }

    // Mostrar detalles de todos los usuarios en Firestore
    console.log("\n📋 Detalles de usuarios en Firestore:");
    usersSnapshot.forEach((doc, index) => {
      const data = doc.data();
      console.log(`\n👤 Usuario ${index + 1} (Doc ID: ${doc.id}):`);
      console.log(`   Email: ${data.email || "SIN EMAIL"}`);
      console.log(`   UID: ${data.uid || "SIN UID"}`);
      console.log(`   Name: ${data.name || data.displayName || "SIN NOMBRE"}`);
      console.log(`   Email Verificado: ${data.emailVerified || false}`);
      console.log(`   Migrado: ${data.migratedAt ? "SÍ" : "NO"}`);
      console.log(`   Fuente: ${data.migrationSource || "ORIGINAL"}`);

      if (!data.email) {
        console.log(`   ⚠️  PROBLEMA: Usuario sin email`);
      } else if (firebaseAuthEmails.includes(data.email)) {
        console.log(`   ✅ Sincronizado con Firebase Auth`);
      } else {
        console.log(`   ❌ NO MIGRADO: Email no encontrado en Firebase Auth`);
      }
    });
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

checkFirebaseUsers();
