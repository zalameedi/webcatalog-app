import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

import { closeSnackbar } from '../../actions/snackbar';

const EnhancedSnackbar = (props) => {
  const {
    actionText,
    open,
    message,
    onCloseSnackbar,
  } = props;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={20e3}
      onRequestClose={onCloseSnackbar}
      SnackbarContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={message}
      action={
        <Button color="accent" dense onClick={onCloseSnackbar}>
          {actionText}
        </Button>
      }
    />
  );
};

const mapStateToProps = state => ({
  actionText: state.snackbar.actionText,
  open: state.snackbar.open,
  message: state.snackbar.message,
});

EnhancedSnackbar.propTypes = {
  actionText: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  message: PropTypes.bool.isRequired,
  onCloseSnackbar: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onCloseSnackbar: () => dispatch(closeSnackbar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedSnackbar);
