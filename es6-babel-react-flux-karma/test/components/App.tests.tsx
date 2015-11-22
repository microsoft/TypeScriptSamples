import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import App from '../../src/components/App';
import WhoToGreet from '../../src/components/WhoToGreet';
import GreetingStore from '../../src/stores/GreetingStore';
const __react = React; // only in place to prevent React being purged from dependencies as not used directly

describe('App', () => {
  it('renders expected HTML', () => {
    const app = render({ targetOfGreeting: 'Benjamin' });
    expect(app).toEqual(
      <div className="container-fluid">
        <h1>Hello { 'Benjamin' }</h1>

        <WhoToGreet targetOfGreeting={ 'Benjamin' } />
      </div>
    );
  });

  function render(state) {
    const shallowRenderer = TestUtils.createRenderer();
    spyOn(GreetingStore, 'getState').and.returnValue(state);

    shallowRenderer.render(<App />);
    return shallowRenderer.getRenderOutput();
  }
});
