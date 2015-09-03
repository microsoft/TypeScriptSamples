import * as React from 'react';
import * as $ from 'jquery';
import {Greeter as Greetifier, GreeterProps as GreeterProps} from 'greeter';

function getRandomGreeting() {
    switch (Math.floor(Math.random() * 4)) {
        case 0: return 'Hello';
        case 1: return 'Howdy';
        case 2: return 'Greetings to you';
        case 3: return 'Hail';
    }
}

$(() => {
    let props: GreeterProps = {
        whomToGreet: 'world!',
    };

    React.render(<Greetifier {...props} />, $('#output').get(0));
});

