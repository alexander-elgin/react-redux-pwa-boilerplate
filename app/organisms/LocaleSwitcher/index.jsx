import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import messages from './messages';
import translationMessages from '../../i18n';
import Dropdown from '../../molecules/Dropdown';
import { changeLocale } from '../../store/language/actions';
import { makeSelectLocale } from '../../store/language/selectors';
import setYupLocale from '../../utils/yup';

const selector = createStructuredSelector({
  locale: makeSelectLocale(),
});

const LocaleSwitcher = () => {
  const { locale } = useSelector(selector);
  const dispatch = useDispatch();

  return (
    <Dropdown
      value={locale}
      values={Object.keys(translationMessages)}
      messages={messages}
      onChange={({ target }) => {
        const { value: localeId } = target;
        setYupLocale(localeId);
        dispatch(changeLocale(localeId));
      }}
    />
  );
};

export default LocaleSwitcher;
