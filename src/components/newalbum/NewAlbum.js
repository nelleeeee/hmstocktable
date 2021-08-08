import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useHistory } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const NewAlbum = ({ Sidebar, pathh }) => {
  const history = useHistory();
  const [events, setEvents] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    db.collection("newalbum").onSnapshot(snapshot =>
      setEvents(
        snapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          start: doc.data().start,
          end: doc.data().end,
        }))
      )
    );
  }, []);

  return (
    <>
      <Sidebar pathh={pathh} />
      <div className="w-full h-auto flex flex-col items-center">
        <div className="flex-col w-3/4 m-auto mt-20">
          {events && (
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              // headerToolbar={{
              //   center: "new",
              // }}
              // customButtons={{
              //   new: {
              //     text: "new",
              //     click: () => console.log("new event"),
              //   },
              // }}
              events={events}
              eventColor="red"
              nowIndicator
              // dateClick={e => console.log(e.dateStr)}
              eventClick={e => history.push(`/${pathh}/newalbum/${e.event.id}`)}
            />
          )}
        </div>
        {user.email === "kurare72@gmail.com" ? (
          <button
            onClick={() => history.push(`/${pathh}/newalbumadd`)}
            className="bg-gray-400 py-1 px-5 rounded mt-10 w-32"
          >
            스케줄쓰기
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default NewAlbum;
