const { db, auth } = require("./firestore");

module.exports.getPage = async page => {
    return new Promise((resolve, reject) => {
        db.collection(page)
            .get()
            .then(snapshot => {
                const docs = [];
                snapshot.forEach(doc => {
                    const docVal = {};
                    docVal[doc.id] = doc.data();
                    docs.push(docVal);
                });
                resolve(docs);
            })
            .catch(err => {
                reject(err);
            });
    });
};

module.exports.updateValue = async (page, id, value) => {
    db.collection(page)
        .doc(id)
        .update({ value });
};

module.exports.login = async (email, password) => {
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            return true;
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorCode, errorMessage);
            throw error;
            // ...
        });
};

module.exports.signOut = async () => {
    auth.signOut()
        .then(function() {
            return true;
        })
        .catch(function(error) {
            throw error;
            // An error happened.
        });
};
