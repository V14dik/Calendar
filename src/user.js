import { getDatabase, ref, onValue } from "firebase/database";

export class User {
  static async create(user) {
    const response = await fetch(
      "https://calendar-57a3d-default-rtdb.firebaseio.com/users.json",
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const fullResponse = await response.json();
    //user.id = fullResponse.name;
    //const user_1 = user;
    //addToLocalStorage(user_1);
  }

  static async addEvent(event, uid) {
    const response = await fetch(
      `https://calendar-57a3d-default-rtdb.firebaseio.com/users/${uid}/events.json`,
      {
        method: "POST",
        body: JSON.stringify(event),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const fullResponse = await response.json();
    User.readEventsFromDB(uid);
  }

  static async addTheme(theme, uid) {
    const response = await fetch(
      `https://calendar-57a3d-default-rtdb.firebaseio.com/users/${uid}/themes.json`,
      {
        method: "POST",
        body: JSON.stringify(theme),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const fullResponse = await response.json();
    User.readThemesFromDB(uid);
  }
  static async readEventsFromDB(uid) {
    let events = [];
    localStorage.setItem("events", []);
    try {
      const db = getDatabase();
      const eventsRef = ref(db, `users/${uid}/events`);
      onValue(eventsRef, (eventsSnap) => {
        eventsSnap.forEach((eventsChild) => {
          const event = eventsChild.val();
          events.push(event);
        });
        localStorage.setItem("events", JSON.stringify(events));
      });
    } catch (e) {
      alert(e);
    }
  }

  static async readThemesFromDB(uid) {
    let themes = [];
    try {
      const db = getDatabase();
      const themesRef = ref(db, `users/${uid}/themes`);
      onValue(themesRef, (themesSnap) => {
        themesSnap.forEach((themesChild) => {
          const theme = themesChild.val();
          themes.push(theme);
        });
        localStorage.setItem("themes", JSON.stringify(themes));
      });
    } catch (e) {
      alert(e);
    }
  }
}
