import OneSignal from "react-onesignal";

// services/OneSignalService.js

class OneSignalService {
  static async initializ({ isLocal = false }) {
    if (typeof window !== "undefined") {
      // Make sure OneSignal is only initialized in the browser
      try {
        // Ensure this code runs only on the client side
        OneSignal.init({
          appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
          safari_web_id: process.env.NEXT_PUBLIC_ONESIGNAL_SAFARI_WEB_ID,
          notifyButton: {
            enable: true,
          },
          // Uncomment the below line to run on localhost. See: https://documentation.onesignal.com/docs/local-testing
          allowLocalhostAsSecureOrigin: isLocal,
        });

        // Show Prompt for Permission
        OneSignal.Slidedown.promptPush();
        // return OneSignal;
      } catch (error) {
        console.error("OneSignal initialization failed:", error);
        // return null;
      }
    }
  }

  static login(newId) {
    console.log("😍😍😍OneSignal Login with Firebase UID", newId);
    if (typeof window !== "undefined") {
      OneSignal.logout();
      OneSignal.login(newId);
    }
  }

  static logout() {
    // Logout from OneSignal
    console.log("😜😜😜 Log Out");
    if (typeof window !== "undefined") {
      OneSignal.logout();
    }
  }
}

export default OneSignalService;
