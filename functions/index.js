const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const runtimeOpts = {
  timeoutSeconds: 10,
  memory: '128MB'
};

exports.deleteProject = functions
  .runWith(runtimeOpts)
  .region('us-central1')
  .https
  .onCall(async (data, context) => {
    const projectId = data.id;

    try {
      await admin.firestore().collection('projects').doc(projectId).delete();
      return { success: true };
    } catch (error) {
      throw new functions.https.HttpsError('internal', 'Error al eliminar el proyecto');
    }
  });