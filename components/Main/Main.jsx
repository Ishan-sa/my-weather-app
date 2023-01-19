import axios from "axios";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Card from "../Cards/Card";
import { RiCloudWindyLine } from "react-icons/ri";
import { WiHumidity } from "react-icons/wi";
import Toast from "../Toast/Toast";
import { motion } from "framer-motion";
import { AiFillGithub } from "react-icons/ai";
import Lottie from "lottie-react";

export default function Main() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState(false);
  const [toast, setToast] = useState(false);
  const [beforeText, setBeforeText] = useState(
    "Please search for a city name to continue."
  );
  const [loading, setLoading] = useState(false);
  const [displayData, setDisplayData] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const lang = "en";
  const units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&lang=${lang}&appid=${apiKey}`;
  const getWeather = async () => {
    try {
      setLoading(true);
      console.clear();
      const response = await axios.get(url);
      setTimeout(() => {
        setLoading(false);
        setDisplayData(true);
        setData(response.data);
        setWeather(response.data.weather);
        setToast(false);
        setTemp(true);
        setBeforeText("");
        console.log(response.data);
      }, 1000);
    } catch (e) {
      setLoading(false);
      console.log(e);
      setToast(true);
      setTemp(false);
      setDisplayData(false);
      setBeforeText("Please search for a city name to continue.");
    }
    setLocation("");
  };

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const day = date.getDate();
  const weekDay = date.toLocaleString("default", { weekday: "long" });
  const trimmedMonth = month.substring(0, 3);

  return (
    <>
      <div className="flex sidebar w-full flex-col sidebar h-screen">
        <div className="flex gap-2 w-full py-4 px-7 justify-around drop-shadow-2xl bg-[#091536]">
          <div className="flex flex-col">
            <p className="text-xl font-semibold text-[#ddfcff]">
              {month}, {year}
            </p>
            <p className="text-md font-normal text-[#d7d7d7]">
              {weekDay} {trimmedMonth} {day}, {year}
            </p>
          </div>
          <div className="flex items-center gap-10">
            <div className="input-container relative flex">
              <div className="absolute right-5 top-3 ">
                <BsSearch
                  className="text-lg text-[#8d8d8d] cursor-pointer"
                  onClick={getWeather}
                />
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={location}
                  placeholder="Enter a city"
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={searchLocation}
                  className="p-2 rounded-md max-w-[400px]"
                />
              </div>
            </div>
            <AiFillGithub
              className="text-3xl text-[#8d8d8d] hover:text-[#58f7ff] transition-all duration-300 cursor-pointer"
              onClick={() => {
                window.open(
                  "https://github.com/Ishan-sa/my-weather-app",
                  "_blank"
                );
              }}
            />
          </div>
        </div>

        <div className="flex justify-center mb-[1rem] flex-col items-center gap-5">
          <p className="text-3xl text-[#f5f5f5] mt-7">Today's Overview</p>
          <hr className="w-[100px] border-t-4 border-[#1E5676]" />
          <p className="text-xl text-[#58f7ff] text-center">{beforeText}</p>
          {loading && (
            <Lottie
              animationData={require("../../public/loading.json")}
              style={{
                width: "150px",
                height: "150px",
              }}
            />
          )}
        </div>

        {displayData ? (
          <main className="flex flex-col items-center w-full pb-5">
            {temp && (
              <motion.div
                className="flex flex-col justify-between gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.2 }}
              >
                <div className="flex flex-row items-center">
                  <div className="flex flex-row items-center justify-between w-full gap-[8rem]">
                    <p className="text-[#f5f5f5] text-3xl">{data.name}</p>
                    <p className="text-[#bbbbbb] text-lg">
                      {data.sys && data.sys.country}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex- flex-col">
                    <div className="flex items-center gap-4">
                      <p className="text-[#58f7ff] text-5xl">
                        {Math.round(
                          data.main && data.main.temp
                        ).toLocaleString() + "°C"}
                      </p>
                      <div className="flex flex-col gap-2">
                        <p className="text-gray-700 text-xs">
                          MIN <br />
                          <span className="text-gray-400">
                            {Math.round(data.main && data.main.temp_min) + "°C"}
                          </span>
                        </p>
                        <p className="text-gray-700 text-xs">
                          MAX <br />
                          <span className="text-gray-400">
                            {Math.round(data.main && data.main.temp_max) + "°C"}
                          </span>
                        </p>
                      </div>
                    </div>
                    <p className="text-[#a2a2a2] text-lg mt-1">
                      Feels like {Math.round(data.main && data.main.feels_like)}
                      °C
                    </p>
                  </div>
                  <p className="text-[#dedede] text-right text-lg">
                    {data.weather && data.weather[0].main}
                  </p>
                </div>
              </motion.div>
            )}

            {temp && (
              <div className="my-8 container">
                {weather &&
                  weather.map((o, i) => {
                    return (
                      <motion.div
                        key={i}
                        className="grid gap-5 grid-flow-col grid-cards px-8 item container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      >
                        <Card
                          title="Wind Gust"
                          description={data.wind && data.wind.gust}
                        />
                        <Card
                          title="Air Pressure"
                          description={data.main && data.main.pressure}
                          icon={
                            <RiCloudWindyLine
                              style={{ fontSize: "2rem", color: "#58f7ff" }}
                            />
                          }
                        />
                        <Card
                          title="Humidity"
                          description={data.main && data.main.humidity}
                          icon={
                            <WiHumidity
                              style={{ fontSize: "2rem", color: "#58f7ff" }}
                            />
                          }
                        />
                        <Card
                          title="Visibility"
                          description={data.visibility}
                        />
                      </motion.div>
                    );
                  })}
              </div>
            )}
          </main>
        ) : null}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          exit={{ opacity: 0, y: 100 }}
          className="absolute bottom-8 left-8"
        >
          {toast && <Toast />}
        </motion.div>
      </div>
    </>
  );
}
