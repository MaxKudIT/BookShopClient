export const textFieldStyles = {
  height: 43,


  '& .MuiOutlinedInput-root': {
    height: '40px',
    borderRadius: 2,
    background: '#181d2280',
    '& .MuiInputBase-input': {
      color: '#F3F4F6FF',
      fontSize: '14px',
      fontWeight: 400,
      '&:-webkit-autofill': {
        WebkitTextFillColor: 'white',
        WebkitBoxShadow: '0 0 0px 1000px transparent inset',
        transition: 'background-color 5000s ease-in-out 0s',
      },

      '&:-webkit-autofill:hover': {
        WebkitTextFillColor: 'white',
        WebkitBoxShadow: '0 0 0px 1000px transparent inset',
      },

      '&:-webkit-autofill:focus': {
        WebkitTextFillColor: 'white',
        WebkitBoxShadow: '0 0 0px 1000px transparent inset',
      },
    },

    '& .MuiInputAdornment-positionStart': {
      color: '#BDC1CAFF',
    },

    '& .MuiInputAdornment-positionEnd': {
      color: '#BDC1CAFF',
    },
    '& fieldset': {
      borderColor: '#323743FF',

    },
    '&:hover': {
      '& fieldset': {
        borderColor: 'rgb(86, 92, 109)'
      },
    },
    '&.Mui-focused': {
      '& fieldset': {
        borderColor: 'rgb(86, 92, 109)',
        borderWidth: 2,
      },

    },
  },

  '& .MuiInputLabel-root': {
    color: '#F3F4F6FF !important',


  },

};

export const buttonStyles = {
  width: '100%',
  height: 45,

  textTransform: 'none',
  borderRadius: 2,
  fontSize: '14px',
  fontWeight: '700',
  color: 'rgb(21, 23, 29)',
  position: 'relative',

  background: '#6379E9FF',
  boxShadow: '0px 0px 2px #1F36AD33, 0px 4px 7px #1F36AD33',
  columnGap: 1,
  marginBottom: 3

}

