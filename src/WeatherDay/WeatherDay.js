import "./WeatherDay.css";

export const WeatherDay = ({ date, avgTemp, condition, image }) => {
  
  const dof = new Date(date + "EST");
  const dayOftheWeek = dof.getDay();
  const roundTemp = Math.round(avgTemp);

  return (
    <div>
      <p className={"day day" + dayOftheWeek}></p>
      <div>
        <img className="condImg" src={image}></img>
      </div>
      <p className="wInfo temp">{roundTemp}&#176; </p>
      <p className="wInfo">{condition}</p>
    </div>
  );
};
