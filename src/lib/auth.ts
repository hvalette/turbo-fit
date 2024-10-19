import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink as firebaseSignInWithEmailLink,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { app } from './firebase';

export const auth = getAuth(app);

export const sendEmailLink = async (email: string) => {
  const actionCodeSettings = {
    url: 'http://localhost:3000/login',
    handleCodeInApp: true,
  };

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    localStorage.setItem('emailForSignIn', email);
  } catch (error) {
    console.error(error);
  }
};

export const signInWithEmailLink = async () => {
  try {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email =
          window.prompt('Please provide your email for confirmation') ?? '';
      }
      // The client SDK will parse the code from the link for you.
      await firebaseSignInWithEmailLink(auth, email, window.location.href);
    }
  } catch (error) {
    console.error(error);
  }
};

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error);
  }
};
