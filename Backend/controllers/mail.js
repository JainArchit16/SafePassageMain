const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/contact");

require("dotenv").config();

exports.sendMail = async (req, res) => {
  try {
    const email = req.body.email;
    const personName = req.body.personName;
    const date = req.body.date;
    const time = req.body.time;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const carNumber = req.body.carNumber;
    const carModel = req.body.carModel;
    console.log(email);
    await mailSender(
      email,
      "Contact Info",
      courseEnrollmentEmail(
        personName,
        date,
        time,
        latitude,
        longitude,
        carNumber,
        carModel
      )
    );

    return res.json({
      success: true,
      message: "Email Sent Successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Failed at Sending Mail",
    });
  }
};
