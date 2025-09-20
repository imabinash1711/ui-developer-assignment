import { useEffect, useState } from "react";
import { useSidebar } from "../hooks/use-sidebar";

interface Detail {
  title: string;
  image: string;
  time: string;
}

const SIDEBAR_CLASS =
  "transition-all duration-300 overflow-hidden h-screen border-l border-light-black/10 dark:border-white/10";

const NotificationItem: React.FC<{ detail: Detail; index: number }> = ({
  detail,
  index,
}) => {
  return (
    <div className="flex gap-2 items-start cursor-pointer hover:bg-light-black/5 dark:hover:bg-white/10 p-1 rounded-lg">
      <img
        src={detail.image}
        alt={detail.title}
        className={`w-6 h-6 rounded-lg p-1 ${
          index % 2 === 0 ? "bg-primary-blue" : "bg-primary-purple"
        }`}
      />
      <div className="flex flex-col text-sm w-full">
        <span className="text-light-black dark:text-white truncate w-48">
          {detail.title}
        </span>
        <span className="text-light-black/40 dark:text-white/40">
          {detail.time}
        </span>
      </div>
    </div>
  );
};

const ActivityItem: React.FC<{ detail: Detail }> = ({ detail }) => {
  return (
    <div className="flex gap-2 items-start cursor-pointer hover:bg-light-black/5 dark:hover:bg-white/10 p-1 rounded-lg">
      <div className="flex flex-col items-center relative">
        <img
          src={detail.image}
          alt={detail.title}
          className="w-6 h-6 rounded-lg"
        />
        <div className="absolute -bottom-6 border-l h-4 border-light-black/10 dark:border-white/10" />
      </div>
      <div className="flex flex-col text-sm w-full">
        <span className="text-light-black dark:text-white truncate w-48">
          {detail.title}
        </span>
        <span className="text-light-black/40 dark:text-white/40">
          {detail.time}
        </span>
      </div>
    </div>
  );
};

const ContactItem: React.FC<{ detail: Detail }> = ({ detail }) => {
  return (
    <div className="flex text-sm w-full gap-2 items-center cursor-pointer hover:bg-light-black/5 dark:hover:bg-white/10 p-1 rounded-lg">
      <img
        src={detail.image}
        alt={detail.title}
        className="w-6 h-6 rounded-lg"
      />
      <div className="text-light-black dark:text-white truncate place-self-center -mt-0.5 w-48">
        {detail.title}
      </div>
    </div>
  );
};

export const RightSideBar = () => {
  const { isOpen } = useSidebar("rightSidebar");
  const [data, setData] = useState<Record<string, Detail[]>>({});

  useEffect(() => {
    fetch("/assets/jsons/right-sidebar-details.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load JSON");
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div
      className={`${SIDEBAR_CLASS} overflow-hidden ${
        isOpen ? "w-rightSidebar" : "w-0"
      }`}
    >
      <nav className="flex flex-col h-full gap-6 text-sm p-5 pr-3 w-rightSidebar overflow-auto">
        {Object.entries(data).map(([section, details]) => {
          return (
            <div className="flex flex-col gap-2" key={section}>
              <p className="flex text-light-black dark:text-white font-bold px-1 py-2">
                {section}
              </p>
              {details.length === 0 && (
                <p className="text-light-black/40 dark:text-white/40 px-1 text-center">
                  No more {section.toLowerCase()}.
                </p>
              )}
              {details.map((detail, idx) => {
                if (section === "Notifications") {
                  return (
                    <NotificationItem
                      key={`${section}-${idx}`}
                      detail={detail}
                      index={idx}
                    />
                  );
                }
                if (section === "Activities") {
                  return (
                    <ActivityItem key={`${section}-${idx}`} detail={detail} />
                  );
                }
                if (section === "Contacts") {
                  return (
                    <ContactItem key={`${section}-${idx}`} detail={detail} />
                  );
                }
                return null;
              })}
            </div>
          );
        })}
      </nav>
    </div>
  );
};
