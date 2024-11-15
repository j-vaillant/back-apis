function saveSession(req) {
  return new Promise((resolve, reject) => {
    req.session.save((err) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log("session saved");
        resolve();
      }
    });
  });
}

module.exports.saveSession = saveSession;
