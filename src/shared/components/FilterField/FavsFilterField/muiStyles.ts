import { PiX } from "react-icons/pi";

export const textFieldStyles = {
  height: 40,
  width: '100%',
  maxWidth: 500,

  '& .MuiFilledInput-root': {

    height: '100%',
    background: '#181921FF',
    border: '1px solid #353746FF',
    borderRadius: 3,
    display: 'flex',
    alignItems: 'center',

    '&:before, &:after, &:hover:before, &.Mui-focused:after': {
      border: 'none',
      display: 'none',
    },



    '&:hover': {
      backgroundColor: 'hsl(233, 13%, 14%)',
    },

    '&.Mui-focused': {
      backgroundColor: 'hsl(233, 13%, 14%)',

    },

  },
  '& .MuiFilledInput-input': {

    color: 'rgba(255,255,255,0.9)',
    fontSize: '12px',
    fontWeight: 400,
    padding: 0,
    margin: 0,

    '&::placeholder': {

      opacity: 0.8,

      fontWeight: 400,
    },


  },

  '& .MuiInputAdornment-root': {
    marginTop: '0 !important',

    '& svg': {
      color: 'rgba(255,255,255,0.6)',

    },

  },

  '& .MuiInputLabel-root': {
    color: '#666666 !important',
    fontSize: 14,

  },

  '& .MuiFormHelperText-root': {
    color: '#666666',
    fontSize: '12px',

    '&.Mui-error': {
      color: '#d32f2f',
    },
  },

};




export const selectStyles = {
  formControl: {
    width: 220,

    '& .MuiOutlinedInput-root': {
      border: '1px solid #353746FF',
      backgroundColor: '#181921FF',
      borderRadius: '8px',
      fontSize: 12,
      width: '100%',

      '&:hover': {
        backgroundColor: '#181921FF',
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
      },

      '&.Mui-focused': {
        backgroundColor: '#181921FF !important',
        boxShadow: 'none',
        '& .MuiOutlinedInput-notchedOutline': {

          borderWidth: 0,
        },
      },
    },
  },

  inputLabel: {
    color: '#666666',
    fontSize: 14,
    '&.Mui-focused': {
      color: 'rgba(255,255,255,0.9)',

    }
  },

  select: {

    backgroundColor: 'rgba(255,255,255,0.1)',

    borderRadius: '8px',
    width: 300,
    color: 'rgba(255,255,255,0.9)',


    '&:before, &:after': {
      display: 'none'
    },

    '& .MuiSelect-select': {
      padding: '12px 14px',
      color: 'rgba(255,255,255,0.9)',

      '&:hover': {
        backgroundColor: 'rgb(34, 36, 44)',
        borderRadius: '8px',
      },

      '&:focus': {
        backgroundColor: 'rgb(34, 36, 44)',
        borderRadius: '8px',
      }
    },


    '& .MuiSelect-icon': {
      color: 'rgba(255,255,255,0.9)',
    },
  },

  menuPaper: {
   

    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    background: '#181921FF',
    '&, & *': {

      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
     marginTop: '15px',
    '& .MuiMenuItem-root': {
      color: 'rgba(255,255,255, 1)',
      borderBottom: '1px solid #181921FF',
      padding: '10px 16px',
      fontSize: 12,
      '&:hover': {
        backgroundColor: 'hsl(233, 13%, 14%)',
      },

      '&.Mui-selected': {
        backgroundColor: 'rgb(99, 121, 233, 0.5) !important',
        color: '#ffffffff',

        '&:hover': {
          backgroundColor: 'rgb(99, 121, 233, 0.6) !important',
        },

      },

    },
  }
};