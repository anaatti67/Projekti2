//Control for what the user sees in the page. 
//For example admin sees everything and user only limited content
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.")
  }
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.")
  }