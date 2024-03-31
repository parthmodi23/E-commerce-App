export const SIGNUP = 'SIGNUP';
export const  LOGIN = 'LOGIN';


export const signup = (email, password) => {
  return async (dispatch) => {
  
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDqToxtmiQVpwf87FbKfcdw181V63JhG3U',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );
    
    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    const resData = await response.json();

    dispatch({ type: 'SIGNUP' ,
                payload:{
                  token:resData.idToken,
                  userid:resData.localId }
                });
            };
};


export const login = (email, password) => {
    return async (dispatch) => {
     
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDqToxtmiQVpwf87FbKfcdw181V63JhG3U',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
          })
        }
      );
  

      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!!';
        if (errorId === 'EMAIL_NOT_FOUND') {
          message = 'This email could not be found!';
        } else if (errorId === 'INVALID_PASSWORD') {
          message = 'This password is not valid!';
        }
        throw new Error(message);
      }

      const resData = await response.json();
      console.log(resData)
      dispatch({ type: 'LOGIN' ,
      payload:{
        token:resData.idToken,
        userid:resData.localId }
      });
    }
  };
  