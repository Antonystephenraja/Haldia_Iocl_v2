import LoginModel from "../components/login.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import DataModel from "../components/insert.js";
import Data from "../components/Data.js";

export const register = async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await LoginModel.create({
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: "Duplicate email" });
  }
};

export const login = async (req, res) => {
  const user = await LoginModel.findOne({
    email: req.body.email,
  });
  if (!user) {
    return { status: "error", error: "Invalid User" };
  }
  const isPasswordVaild = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (isPasswordVaild) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
};

export const AllData = (req, res) => {
  DataModel.find({})
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ error: "No data found" });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

export const saveData = async (req, res) => {
  try {
    const inputValue = req.body.inputValue;
    const newData = new Data({ inputValue });
    await newData.save();

    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const FindData = async (req, res) => {
  try {
    const data_stage = req.query.inputValue;

    const currentDateTime = new Date();
    const kolkataTime = currentDateTime.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      hour12: false,
    });

    const [date, time] = kolkataTime.split(", ");
    const [month, day, year] = date.split("/");
    let [hours, minutes, seconds] = time.split(":");

    if (hours === "24") {
      hours = "00";
    }

    hours = hours.padStart(2, "0");
    minutes = minutes.padStart(2, "0");
    seconds = seconds.padStart(2, "0");

    const formattedCurrentTime = `${year}-${month.padStart(
      2,
      "0"
    )}-${day.padStart(2, "0")} ${hours}:${minutes}:${seconds}`;

    // console.log("time:", formattedCurrentTime);

    // last 1 hr data
    if (data_stage === "1hr") {
      const currentTimeMinusOneHr = new Date(
        currentDateTime.getTime() - 1 * 60 * 60 * 1000
      );

      const kolkataTime2 = currentTimeMinusOneHr.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
      });

      const [date2, time2] = kolkataTime2.split(", ");
      const [month2, day2, year2] = date2.split("/");
      let [hours2, minutes2, seconds2] = time2.split(":");

      if (hours2 === "24") {
        hours2 = "00";
      }

      hours2 = hours2.padStart(2, "0");
      minutes2 = minutes2.padStart(2, "0");
      seconds2 = seconds2.padStart(2, "0");

      const formattedCurrentTimeMinusOneHr = `${year2}-${month2.padStart(
        2,
        "0"
      )}-${day2.padStart(2, "0")} ${hours2}:${minutes2}:${seconds2}`;

      // console.log("time before 1hr:", formattedCurrentTimeMinusOneHr);

      const data = await DataModel.find({
        time: {
          $gte: formattedCurrentTimeMinusOneHr,
          $lte: formattedCurrentTime,
        },
      }).sort({ _id: -1 });
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ error: "No Data Found" });
      }
    }

    // last 12 hr data
    else if (data_stage === "12hr") {
      const currentTimeMinusTwelveHr = new Date(
        currentDateTime.getTime() - 12 * 60 * 60 * 1000
      );

      const kolkataTime2 = currentTimeMinusTwelveHr.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
      });

      const [date2, time2] = kolkataTime2.split(", ");
      const [month2, day2, year2] = date2.split("/");
      let [hours2, minutes2, seconds2] = time2.split(":");

      if (hours2 === "24") {
        hours2 = "00";
      }

      hours2 = hours2.padStart(2, "0");
      minutes2 = minutes2.padStart(2, "0");
      seconds2 = seconds2.padStart(2, "0");

      const formattedCurrentTimeMinusTwelveHr = `${year2}-${month2.padStart(
        2,
        "0"
      )}-${day2.padStart(2, "0")} ${hours2}:${minutes2}:${seconds2}`;

      // console.log("time before 12hr:", formattedCurrentTimeMinusTwelveHr);

      const data = await DataModel.find({
        time: {
          $gte: formattedCurrentTimeMinusTwelveHr,
          $lte: formattedCurrentTime,
        },
      }).sort({ _id: -1 });
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ error: "No Data Found" });
      }
    }

    // last 24 hr data
    else if (data_stage === "24hr") {
      const currentTimeMinusTwentyFourHr = new Date(
        currentDateTime.getTime() - 24 * 60 * 60 * 1000
      );

      const kolkataTime2 = currentTimeMinusTwentyFourHr.toLocaleString(
        "en-US",
        {
          timeZone: "Asia/Kolkata",
          hour12: false,
        }
      );

      const [date2, time2] = kolkataTime2.split(", ");
      const [month2, day2, year2] = date2.split("/");
      let [hours2, minutes2, seconds2] = time2.split(":");

      if (hours2 === "24") {
        hours2 = "00";
      }

      hours2 = hours2.padStart(2, "0");
      minutes2 = minutes2.padStart(2, "0");
      seconds2 = seconds2.padStart(2, "0");

      const formattedCurrentTimeMinusTwentyFourHr = `${year2}-${month2.padStart(
        2,
        "0"
      )}-${day2.padStart(2, "0")} ${hours2}:${minutes2}:${seconds2}`;

      // console.log("time before 24hr:", formattedCurrentTimeMinusTwentyFourHr);

      const data = await DataModel.find({
        time: {
          $gte: formattedCurrentTimeMinusTwentyFourHr,
          $lte: formattedCurrentTime,
        },
      }).sort({ _id: -1 });
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ error: "No Data Found" });
      }
    }

    // last 7 days data
    else if (data_stage === "7d") {
      const currentTimeMinusSevenDays = new Date(
        currentDateTime.getTime() - 7 * 24 * 60 * 60 * 1000
      );

      const kolkataTime2 = currentTimeMinusSevenDays.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
      });

      const [date2, time2] = kolkataTime2.split(", ");
      const [month2, day2, year2] = date2.split("/");
      let [hours2, minutes2, seconds2] = time2.split(":");

      if (hours2 === "24") {
        hours2 = "00";
      }

      hours2 = hours2.padStart(2, "0");
      minutes2 = minutes2.padStart(2, "0");
      seconds2 = seconds2.padStart(2, "0");

      const formattedCurrentTimeMinusSevenDays = `${year2}-${month2.padStart(
        2,
        "0"
      )}-${day2.padStart(2, "0")} ${hours2}:${minutes2}:${seconds2}`;

      // console.log("time before 7d:", formattedCurrentTimeMinusSevenDays);

      const data = await DataModel.find({
        time: {
          $gte: formattedCurrentTimeMinusSevenDays,
          $lte: formattedCurrentTime,
        },
      }).sort({ _id: -1 });
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ error: "No Data Found" });
      }
    }

    // last 30 days data
    else if (data_stage === "30d") {
      const currentTimeMinusThirtyDays = new Date(
        currentDateTime.getTime() - 30 * 24 * 60 * 60 * 1000
      );

      const kolkataTime2 = currentTimeMinusThirtyDays.toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
      });

      const [date2, time2] = kolkataTime2.split(", ");
      const [month2, day2, year2] = date2.split("/");
      let [hours2, minutes2, seconds2] = time2.split(":");

      if (hours2 === "24") {
        hours2 = "00";
      }

      hours2 = hours2.padStart(2, "0");
      minutes2 = minutes2.padStart(2, "0");
      seconds2 = seconds2.padStart(2, "0");

      const formattedCurrentTimeMinusThirtyDays = `${year2}-${month2.padStart(
        2,
        "0"
      )}-${day2.padStart(2, "0")} ${hours2}:${minutes2}:${seconds2}`;

      // console.log("time before 30d:", formattedCurrentTimeMinusThirtyDays);

      const data = await DataModel.find({
        time: {
          $gte: formattedCurrentTimeMinusThirtyDays,
          $lte: formattedCurrentTime,
        },
      }).sort({ _id: -1 });
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ error: "No Data Found" });
      }
    }

    // console.log(data_stage);

    // if (data_stage) {
    // const data = await DataModel.find({}).sort({ _id: -1 }).limit(data_stage);
    // if (data.length > 0) {
    //   res.status(200).json(data);
    //   // console.log("db time format:", data[0].time);
    // } else {
    //   res.status(404).json({ error: "No Data Found" });
    // }
    // } else {
    //   res.status(501).json({ error: "undefined" });
    // }
  } catch (error) {
    console.error("Error with fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const Limits_Data = async (req, res) => {
  Data.findOne({}, {}, { sort: { _id: -1 } })
    .then((data) => {
      if (data) {
        res.status(200).json({ inputValue: data.inputValue });
      } else {
        res.status(400).json({ error: "No Data found" });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

export const Report_data = async (req, res) => {
  try {
    const fromDates = req.body.fromDates;
    const todatas = req.body.toDates;

    const filteredData = await DataModel.find({
      time: {
        $gte: fromDates,
        $lte: todatas,
      },
    });

    res.status(200).json(filteredData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// http://localhost:4000/backend/insertData?R_N=4&sensor1=10&sensor2=20&sensor3=30&sensor4=40&sensor5=50&time=2023-12-01T12:00:00Z

export const insertData = async (req, res) => {
  const { R_N, sensor1, sensor2, sensor3, sensor4, sensor5, time } = req.query;
  if (
    !R_N ||
    !sensor1 ||
    !sensor2 ||
    !sensor3 ||
    !sensor4 ||
    !sensor5 ||
    !time
  ) {
    return res.status(400).json({ error: "Missing required parameters" });
  }
  try {
    const newData = {
      R_N: R_N,
      sensor1: sensor1,
      sensor2: sensor2,
      sensor3: sensor3,
      sensor4: sensor4,
      sensor5: sensor5,
      time: time,
    };

    await DataModel.create(newData);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
