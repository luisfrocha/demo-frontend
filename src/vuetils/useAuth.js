import { ref } from 'vue';
import { supabase } from '../lib/supabase';
// import { Session, Provider } from '@supabase/gotrue-js/dist/main/lib/types'

const userSession = ref(null);

/*
 * Handles user login via email + password into a supabase session.
 * If not password is empty, it will send a magic link to the users email address.
 */
async function handleLogin(credentials) {
  try {
    const { error, user } = await supabase.auth.signIn({
      email: credentials.email,
      password: credentials.password,
    });
    if (error) {
      return 'Error logging in: ' + error.message;
    }
    // No error throw, but no user detected so send magic link
    if (!error && !user) {
      return 'Check your email for the login link!';
    }
  } catch (error) {
    console.error('Error thrown:', error.message);
    return error.error_description || error;
  }
}

/*
 * Handles signup provided a valid credentials object.
 */
async function handleSignup(credentials) {
  try {
    const { email, password } = credentials;
    // prompt user if they have not filled populated their credentials
    if (!email || !password) {
      alert('Please provide both your email and password.');
      return;
    }
    const result = await supabase.auth.signUp({ email, password });
    const { error, user } = result;
    if (error) {
      // alert(error.message)
      console.error(error, error.message);
      return { error: error.message };
    }
    if (user) {
      return { user };
    }
    // alert('Signup successful, confirmation mail should be sent soon!')
  } catch (err) {
    alert('Fatal error signing up');
    console.error('signup error', err);
  }
}

/**
 * Handles signup via Third Party Login.
 * https://supabase.io/docs/guides/auth#third-party-logins
 */
async function handleOAuthLogin(provider) {
  const { error } = await supabase.auth.signIn({ provider });
  if (error) console.error('Error: ', error.message);
}

/**
 * Handles password reset. Will send an email to the given email address.
 */
async function handlePasswordReset(redirectTo) {
  const email = prompt('Please enter your email:');
  if (!email) {
    window.alert('Email address is required.');
  } else {
    const { error } = await supabase.auth.api.resetPasswordForEmail(email, {
      redirectTo,
    });
    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Password recovery email has been sent.');
    }
  }
}

async function handleUpdateUser(credentials) {
  try {
    const { error } = await supabase.auth.update(credentials);
    if (error) {
      alert('Error updating user info: ' + error.message);
    } else {
      alert('Successfully updated user info!');
      window.location.href = '/';
    }
  } catch (error) {
    alert('Error updating user info: ' + error.message);
  }
}

/**
 * Handles logging a user out of a superbase session
 */
async function handleLogout() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert('Error signing out');
      console.error('Error', error);
      return;
    }

    // alert('You have signed out!')
    return;
  } catch (err) {
    alert('Unknown error signing out');
    console.error('Error', err);
  }
}

export {
  userSession,
  handleLogin,
  handleOAuthLogin,
  handleSignup,
  handleLogout,
  handlePasswordReset,
  handleUpdateUser,
};
