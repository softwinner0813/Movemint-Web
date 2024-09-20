"use client"

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Input from "../../components/input";
import Link from "next/link";
import AppleIcon from "@/components/icons/apple-icon";
import GoogleIcon from "@/components/icons/google-icon";
import Logo from "../../../../../public/images/logo/logo.png";
import { Button } from "@/components/ui/button";
import GooglePlayIcon from "@/components/icons/goole-play-icon";
import AppleStoreIcon from "@/components/icons/apple-store-icon";
import { signinMover } from '@/services/api';
import { useRouter } from "next/navigation";
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, OAuthProvider } from "@/services/firebase";
import { useUser } from "@/lib/userContext";
import { createFirebaseUser } from "@/services/firebaseUser";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUserData } = useUser();

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged((user) => {
      if (user) {
        // Redirect to login page if no user is logged in
        router.push('/onboarding');
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to the onboarding page after login
      
      await createFirebaseUser();
      router.push('/onboarding');
    } catch (error) {
      alert("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const email = userCredential.user.email;
      const first_name = userCredential._tokenResponse.firstName;
      const last_name = userCredential._tokenResponse.lastName;
      const avatar = userCredential.user.photoURL;
      const phone_number = userCredential.user.phoneNumber ?? "";
      const google_id = userCredential.user.uid;
      const response = await signinMover({ email, first_name, last_name, avatar, phone_number, google_id });
      if (response.result) {
        setUserData(response.data);
        await createFirebaseUser();
        localStorage.setItem('user-data', JSON.stringify(response.data));
      }
    } catch (error) {
      alert("Google sign-in failed: " + error.message);
    }
  };

  const handleAppleLogin = async () => {

    const appleProvider = new OAuthProvider("apple.com");
    appleProvider.addScope("email");
    appleProvider.addScope("name");

    try {
      const result = await auth.signInWithPopup(provider);

      // This gives you a Apple Access Token. You can use it to access Apple APIs.
      const credential = OAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const idToken = credential.idToken;

      console.log("Signed in with Apple:", result.user);
      console.log("Access Token:", token);
      console.log("ID Token:", idToken);
    } catch (error) {
      alert("Apple sign-in failed: " + error.message);
    }
  };

  const redirectToAppStore = () => {
    window.open(process.env.NEXT_PUBLIC_APP_APPLE_PLAY_LINK, "_blank");
  };

  const redirectToGooglePlay = () => {
    window.open(process.env.NEXT_PUBLIC_APP_GOOGLE_PLAY_LINK, "_blank");
  };

  return (
    ! isAuthenticated && <div className="relative z-10 w-full max-w-80 mx-auto space-y-6 text-center pt-8 pb-32">
      <Image
        src={Logo}
        alt="Movemint Logo"
        width={256}
        height={40}
        className="w-36 lg:w-48 xl:w-72 mx-auto"
      />
      <p className="text-center text-sm text-foreground font-bold">
        Please sign-in as a service provider
      </p>
      <form className="space-y-4" onSubmit={handleEmailLogin}>
        <Input className="text-black text-sm"
          type="email"
          placeholder="support@international.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input className="text-black text-sm"
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="default" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in with email"}
        </Button>
      </form>
      <div className="text-center text-sm text-foreground">
        Or if you don&apos;t have an account,{" "}
        <Link href="/signup" className="text-foreground">
          click here to create one
        </Link>
      </div>
      <div className="flex justify-center items-center space-x-4">
        <p className="text-xs text-foreground">- Or sign in using -</p>
      </div>
      <div className="flex flex-col space-y-4">
        <button
          className="w-full px-7 py-3 flex items-center justify-center space-x-2 bg-black text-foreground rounded-lg"
          onClick={handleAppleLogin}
        >
          <AppleIcon />
          <span className="text-base font-medium">Continue with Apple</span>
        </button>
        <button
          className="w-full py-2 flex items-center justify-center space-x-2 bg-foreground rounded-lg"
          onClick={handleGoogleLogin}
        >
          <GoogleIcon />
          <span className="text-black/50 font-medium">Continue with Google</span>
        </button>
      </div>
      <div className="text-center text-sm text-foreground mt-4">
        <span className="font-bold">For Consumers:</span> <br /> Please
        download the app to continue:
      </div>
      <div className="flex space-x-4 justify-center lg:justify-start">
        <button onClick={redirectToGooglePlay}>
          <GooglePlayIcon />
        </button>
        <button onClick={redirectToAppStore}>
          <AppleStoreIcon />
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
