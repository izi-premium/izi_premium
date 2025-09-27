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

async function deleteTestUsers() {
  try {
    console.log("🗑️ Eliminando usuarios de prueba...");

    // Emails de prueba a eliminar
    const testEmails = [
      "jordanjesusosoriobustos@gmail.com",
      "jordan.osorio2014@umce.cl",
      "jo.osoriob@duocuc.cl",
      "fracto.rrss@gmail.com",
    ];

    const firestore = admin.firestore();

    for (const email of testEmails) {
      console.log(`\n🔍 Procesando: ${email}`);

      // 1. Buscar y eliminar de Firebase Auth
      try {
        const userRecord = await admin.auth().getUserByEmail(email);
        console.log(
          `   📱 Eliminando de Firebase Auth (UID: ${userRecord.uid})`
        );
        await admin.auth().deleteUser(userRecord.uid);
        console.log(`   ✅ Eliminado de Firebase Auth`);
      } catch (authError) {
        if (authError.code === "auth/user-not-found") {
          console.log(`   ⚠️  Usuario no encontrado en Firebase Auth`);
        } else {
          console.log(`   ❌ Error en Firebase Auth: ${authError.message}`);
        }
      }

      // 2. Buscar y eliminar de Firestore
      try {
        const usersQuery = await firestore
          .collection("users")
          .where("email", "==", email)
          .get();

        if (!usersQuery.empty) {
          console.log(
            `   🗄️ Eliminando ${usersQuery.size} documento(s) de Firestore`
          );

          const batch = firestore.batch();
          usersQuery.docs.forEach((doc) => {
            batch.delete(doc.ref);
            console.log(`     - Doc ID: ${doc.id}`);
          });

          await batch.commit();
          console.log(`   ✅ Eliminado de Firestore`);
        } else {
          console.log(`   ⚠️  Usuario no encontrado en Firestore`);
        }
      } catch (firestoreError) {
        console.log(`   ❌ Error en Firestore: ${firestoreError.message}`);
      }

      // 3. Eliminar OTPs si existen
      try {
        const otpDoc = await firestore.collection("otps").doc(email).get();
        if (otpDoc.exists) {
          await firestore.collection("otps").doc(email).delete();
          console.log(`   🗑️ OTP eliminado`);
        }
      } catch (otpError) {
        console.log(`   ⚠️  Error eliminando OTP: ${otpError.message}`);
      }
    }

    console.log("\n✅ Proceso completado");
    console.log("🔄 Ahora puedes probar el registro limpio");
  } catch (error) {
    console.error("❌ Error general:", error);
  }
}

deleteTestUsers();
