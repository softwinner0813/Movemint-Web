"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";

const GetStarted = () => {
  const [formData, setFormData] = useState({
    from: "Los Angeles, California",
    to: "Tokyo, Japan",
    date: new Date("February 22 2024"),
  });
  const [extraStops, setExtraStops] = useState([]);

  const handleExtraStopInputChange = (id, event) => {
    const newStops = extraStops.map((stop) =>
      stop.id === id ? { ...stop, value: event.target.value } : stop
    );
    setExtraStops(newStops);
  };

  const handleAddStop = () => {
    if (extraStops.length >= 2) return;
    setExtraStops([...extraStops, { id: extraStops.length + 1, value: `Extra Stop ${extraStops.length + 1}` }]);
  };

  const handleRemoveStop = (id) => {
    setExtraStops(extraStops.filter((stop) => stop.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "date" ? new Date(value) : value,
    }));
  };

  // const handleChangeLocation = () => {
  //   const from = formData.to;
  //   const to = formData.from;

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     from,
  //     to,
  //   }));
  // };

  return (
    <>
      {/* Mobile */}
      <div className="bg-black rounded-3xl p-3 gap-2">
        <Input
          type="text"
          name="from"
          label="From (Full Address)*"
          imageLogo={'/images/Truck.jpg'}
          placeholder="From (Full Address)"
          value={formData.from}
          onChange={handleInputChange}
        />

        {extraStops.map((stop) => (
          <div key={stop.id} className="flex items-center space-x-2">
            <Input
              type="text"
              name={`extraStop-${stop.id}`}
              label={`Extra Stop ${stop.id}`}
              imageLogo={'/images/Truck.jpg'}
              placeholder="Extra Stop"
              value={stop.value}
              onChange={(event) => handleExtraStopInputChange(stop.id, event)}
              deleteIcon={Minus}
              deleteExtraDestinationFiled={() => handleRemoveStop(stop.id)}
            />
          </div>
        ))}
        <Input
          type="text"
          name="final"
          label="Final Destination"
          imageLogo={'/images/Truck.jpg'}
          placeholder="Final Destination"
          value={formData.to}
          onChange={handleInputChange}
        />

        <div className="w-full flex flex-col items-center gap-3">
          {extraStops.length < 2 && (
            <Button
              className="w-fit px-5 py-1 rounded-xl mt-1"
              onClick={handleAddStop}
            >
              Add Extra Stop
            </Button>
          )}
          <Button className="rounded-full">Request to Book</Button>
        </div>
      </div>

      {/* Desktop */}
      {/* <div className="hidden bg-black rounded-3xl p-3 sm:grid">
        <div className="grid relative">
          <Input
            type="text"
            name="from"
            label="From"
            icon={Truck}
            placeholder="From"
            value={formData.from}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="to"
            label="To"
            icon={Truck}
            placeholder="To"
            value={formData.to}
            onChange={handleInputChange}
          />

          <Button
            type="button"
            onClick={handleChangeLocation}
            className="w-8 p-0 h-8 rounded-xl bg-[#65B5F2] flex items-center justify-center absolute top-[50%] right-4 -translate-y-[50%]"
          >
            <SwapIcon />
          </Button>
        </div>

        <Input
          type="date"
          name="date"
          label="Date"
          icon={DateIcon}
          value={formData.date.toISOString().split("T")[0]}
          onChange={handleInputChange}
        />

        <Button
          className="w-fit px-5 py-1 rounded-xl mx-auto mt-1 mb-3"
          onClick={handleAddStop}
        >
          Add Extra Stop
        </Button>
        <Button size="sm" className="font-bold rounded-full py-4 sm:py-5">
          Let&apos;s go
        </Button>
      </div> */}
    </>
  );
};

export default GetStarted;
