// global variables
let arrayOfLeftSideKeys = [
	[
		'Esc',
		['~', '`'],
		['!', 1],
		['@', 2],
		['#', 3],
		['$', 4],
		['%', 5],
		['^', 6],
		['&', 7],
		['*', 8],
		['(', 9],
		[')', 0],
		['_', '-'],
		['+', '='],
		'Backspace',
	],
	['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', ['{', '['], ['}', ']'], ['|', '\\'], 'Del'],
	['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', [':', ';'], ['"', "'"], 'Enter'],
	['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ['<', ','], ['>', '.'], ['?', '/'], 'Shift'],
	['Ctrl', 'Fn', 'win', 'Alt', 'Spacebar', 'Alt', 'Ctrl', '<', ['&lt', '&gt'], '>', 'Paste'],
];

let arrayOfRightSideKeys = [
	['Home', 'PgUp', 'Nav'],
	['End', 'PgDn', 'Mv Up'],
	['Insert', 'Pause', 'Mv Dn'],
	['PrtScr', 'ScrLk', 'Dock'],
	['Options', 'Help', 'Fade'],
];

// add left keys on keyboard
const left = () => {
	let i = 0;
	let divTag = document.createElement('div');
	divTag.classList.add('keys-block');
	while (i < 5) {
		document.querySelector('.left-side').appendChild(divTag.cloneNode(true));
		document.querySelector('.right-side').appendChild(divTag.cloneNode(true));
		i += 1;
	}
	document.querySelectorAll('.left-side>.keys-block').forEach((div, i) => {
		arrayOfLeftSideKeys[i].forEach((el, index) => {
			let childDiv = document.createElement('div');
			if (
				el == 'Esc' ||
				el == 'Tab' ||
				el == 'Backspace' ||
				el == 'Caps' ||
				el == 'Enter' ||
				el == 'Ctrl' ||
				el == 'Fn' ||
				el == 'Alt'
			) {
				childDiv.classList.add(el.toLowerCase());
				childDiv.innerHTML = el;
			} else if (el == 'Shift') {
				arrayOfLeftSideKeys[i].indexOf(el) == index
					? childDiv.classList.add('left-shift-key')
					: childDiv.classList.add('right-shift-key');
				childDiv.innerHTML = el;
			} else if (typeof el == 'object') {
				if (el.includes('&lt')) {
					childDiv.classList.add('top-down-arrows');
					el.forEach((item) => {
						let subdiv = document.createElement('div');
						let italic = document.createElement('i');
						item == '&lt'
							? italic.classList.add('fa', 'fa-angle-up')
							: italic.classList.add('fa', 'fa-angle-down');
						italic.setAttribute('aria-hidden', 'true');
						subdiv.appendChild(italic);
						childDiv.appendChild(subdiv);
					});
				} else {
					el.forEach((item, i) => {
						let subdiv = document.createElement('div');
						i == 0 ? subdiv.classList.add('deselect') : null;
						subdiv.innerHTML = item;
						childDiv.appendChild(subdiv);
					});
				}
			} else if (el == 'Spacebar') {
				childDiv.classList.add('space-key');
			} else if (el == 'win') {
				childDiv.classList.add('win-logo');
				let italic = document.createElement('i');
				italic.classList.add('fa', 'fa-windows');
				italic.setAttribute('aria-hidden', 'true');
				childDiv.appendChild(italic);
			} else {
				childDiv.innerHTML = el;
			}
			div.appendChild(childDiv);
		});
	});

	// clear keyboard left keys
	const clearLeftKeys = () => {
		document.querySelector('.left-side').innerHTML = '';
		document.querySelector('.right-side').innerHTML = '';
	};
	let shifts = [
		document.querySelector('.caps'),
		document.querySelector('.left-shift-key'),
		document.querySelector('.right-shift-key'),
	];
	shifts.forEach((shift, index) => {
		shift.addEventListener('click', (e) => {
			arrayOfLeftSideKeys.forEach((el, i) =>
				el.forEach((item, j) => {
					if (item.length == 1) {
						item.toUpperCase() == item
							? (arrayOfLeftSideKeys[i][j] = item.toLowerCase())
							: (arrayOfLeftSideKeys[i][j] = item.toUpperCase());
					}
					if (typeof item == 'object' && !item.includes('&lt') && index != 0) {
						let temp = item[0];
						arrayOfLeftSideKeys[i][j][0] = item[1];
						arrayOfLeftSideKeys[i][j][1] = temp;
					}
				})
			);
			clearLeftKeys();
			left();
			right();
		});
	});
};

// add right keys on keyboard
const right = () => {
	document.querySelectorAll('.right-side>.keys-block').forEach((div, i) => {
		arrayOfRightSideKeys[i].forEach((el) => {
			let childDiv = document.createElement('div');
			childDiv.innerHTML = el;
			div.appendChild(childDiv);
		});
	});
};

// keyboard visibility
let toggleOp = document.querySelector('.keyboard-container').classList;
const keyboardMode = () => {
	toggleOp.contains('disNone') ? toggleOp.remove('disNone') : toggleOp.add('disNone');
};
// toggle keyboard visibility on click event
document.querySelector('.toggle-keyboard').addEventListener('click', (e) => {
	keyboardMode();
});

// toggle keyboard visibility on textarea focus event
document.querySelector('#write-board').addEventListener('focus', (e) => {
	toggleOp.contains('disNone') ? toggleOp.remove('disNone') : e.preventDefault();
});

// add click event on keys
let arr = [];
document.querySelector('.keyboard-container').addEventListener('click', (e) => {
	/^([`!@#$%^&*(),.?;'"-=:{}|<>/|\\[\]a-zA-Z0-9])$/.test(e.target.innerHTML) == true
		? (document.querySelector('#write-board').innerHTML += e.target.innerHTML) && arr.push(e.target.innerHTML)
		: e.target.innerHTML == 'Backspace'
		? arr.pop()
		: e.target.classList == 'space-key'
		? arr.push(' ')
		: e.preventDefault();
	document.querySelector('#write-board').focus();
	document.querySelector('#write-board').value = arr.join('');
});

// start full keyboard
left();
right();
