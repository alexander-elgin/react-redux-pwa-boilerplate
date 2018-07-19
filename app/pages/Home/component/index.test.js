import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { IntlProvider } from 'react-intl';

import RepositoriesList from '../RepositoriesList';
import { MetaIntl, TitleIntl } from '../../../common/molecules/Helmet';
import HomePage from './';

Enzyme.configure({ adapter: new Adapter() });

describe('<Home />', () => {
  describe('rendering', () => {
    let component;

    beforeEach(() => {
      component = shallow(
        <HomePage loading error={false} repos={[]} />
      );
    });

    it('renders the repositories list', () => {
      expect(component.contains(<RepositoriesList loading error={false} repos={[]} />)).toBe(true);
    });

    it('renders the centered section', () => expect(component.find('.centered-section').length).toBe(1));
    it('renders the form', () => expect(component.find('.form').length).toBe(1));
    it('renders the section', () => expect(component.find('.section').length).toBe(1));

    it('sets the page title', () => {
      const title = component.find(TitleIntl).first();
      expect(title.prop('id')).toBe('boilerplate.pages.Home.metaTitle');
      expect(title.prop('defaultMessage')).toBe('Home');
    });

    it('sets the page description', () => {
      const description = component.find(MetaIntl).first();
      expect(description.prop('name')).toBe('description');
      expect(description.prop('id')).toBe('boilerplate.pages.Home.metaDescription');
      expect(description.prop('defaultMessage')).toBe('The React.js Boilerplate application homepage');
    });
  });

  it('fetches the repositories list on mount if the username is set', () => {
    const submitSpy = jest.fn();
    mount(
      <IntlProvider locale="en">
        <HomePage
          username="Not Empty"
          repos={[]}
          onChangeUsername={() => {}}
          onSubmitForm={submitSpy}
        />
      </IntlProvider>
    );
    expect(submitSpy).toHaveBeenCalled();
  });

  it('does not fetch the repositories list on mount if the username is an empty string', () => {
    const submitSpy = jest.fn();
    mount(
      <IntlProvider locale="en">
        <HomePage
          repos={[]}
          onChangeUsername={() => {}}
          onSubmitForm={submitSpy}
        />
      </IntlProvider>
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it('does not fetch the repositories list on mount if the username is null', () => {
    const submitSpy = jest.fn();
    mount(
      <IntlProvider locale="en">
        <HomePage
          username=""
          repos={[]}
          onChangeUsername={() => {}}
          onSubmitForm={submitSpy}
        />
      </IntlProvider>
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });
});
