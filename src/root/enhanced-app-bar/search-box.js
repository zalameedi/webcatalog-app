import React from 'react';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import CloseIcon from 'material-ui-icons/Close';
import IconButton from 'material-ui/IconButton';
import Slide from 'material-ui/transitions/Slide';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import grey from 'material-ui/colors/grey';

import connectComponent from '../../helpers/connect-component';

import FakeTitleBar from '../../shared/fake-title-bar';
import {
  ROUTE_SEARCH,
} from '../../constants/routes';
import {
  goBack,
} from '../../state/root/router/actions';
import {
  formUpdate,
} from '../../state/pages/search/actions';
import {
  STRING_BACK,
  STRING_CLEAR,
} from '../../constants/strings';

const styleSheet = {
  appBarContainer: {
    width: '100%',
  },
  toolbar: {
    padding: '0 12px',
  },
  appBar: {
    zIndex: 1,
  },
  searchBarText: {
    lineHeight: 1.5,
    padding: '0 16px',
    flex: 1,
    userSelect: 'none',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontWeight: 'normal',
    fontSize: 21,
  },
  searchBar: {
    boxShadow: 'none',
    position: 'absolute',
    zIndex: 2,
  },
  searchAppBarOpen: {
    marginTop: -44,
    paddingTop: 22,
  },
  searchAppBar: {
    marginTop: -44,
    boxShadow: 'none',
    paddingTop: 24,
  },
  input: {
    font: 'inherit',
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: 'inherit',
    width: '100%',
    '&:focus': {
      outline: 0,
    },
    '&::placeholder': {
      color: grey[400],
    },
  },
};

class SearchBox extends React.Component {
  componentDidUpdate() {
    const {
      open,
    } = this.props;

    if (open) {
      this.inputBox.focus();
    }
  }

  render() {
    const {
      classes,
      open,
      query,
      onFormUpdate,
      onGoBack,
    } = this.props;

    return (
      <Slide in={open} className={classes.searchBar}>
        <div
          className={classes.appBarContainer}
          ref={(appBar) => { this.appBar = appBar; }}
        >
          <FakeTitleBar isColorDisabled />
          <AppBar
            color="default"
            position="static"
            key="searchBar"
            className={open ? classes.searchAppBarOpen : classes.searchAppBar}
          >
            <Toolbar className={classes.toolbar}>
              <IconButton
                color="default"
                aria-label={STRING_BACK}
                onClick={() => onGoBack()}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography
                className={classes.searchBarText}
                color="inherit"
                type="title"
              >
                <input
                  value={query}
                  placeholder="Search Apps"
                  className={classes.input}
                  ref={(inputBox) => { this.inputBox = inputBox; }}
                  onInput={e => onFormUpdate({ query: e.target.value })}
                  onChange={e => onFormUpdate({ query: e.target.value })}
                />
              </Typography>
              <IconButton
                color="default"
                aria-label={query.length > 0 ? STRING_CLEAR : STRING_BACK}
                onClick={() => {
                  if (query.length > 0) {
                    return onFormUpdate({ query: '' });
                  }

                  return onGoBack();
                }}
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
      </Slide>
    );
  }
}

SearchBox.defaultProps = {
  query: '',
};

SearchBox.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  query: PropTypes.string,
  onFormUpdate: PropTypes.func.isRequired,
  onGoBack: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  open: state.router.route === ROUTE_SEARCH,
  query: state.pages.search.form.query,
});

const actionCreators = {
  formUpdate,
  goBack,
};

export default connectComponent(
  SearchBox,
  mapStateToProps,
  actionCreators,
  styleSheet,
);
