const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

var Filter = require('bad-words'),
    filter = new Filter();




exports.badWords = functions.firestore

    .document('tweets/{tweetId}')
    .onCreate(async(snapshot, context) => {

        const data = snapshot.data();

        const clean = filter.clean(data.content)

        if (clean !== data.content) {
            const user = admin.firestore().doc(`users/${data.userId}`)
            await user.update({ status: 'BANNED' })
        }

        return snapshot.ref.update({ content: clean })
    })


exports.myFirstFunction = functions.https.onRequest((req, res) => {

    const name = req.query.name;

    if (!name) {
        res.status(400).send('missing name!')
    }


    res.send(name.split('').reverse().join(''))

})