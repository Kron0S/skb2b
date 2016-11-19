import express from 'express'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}
function getName(fullname) {
  fullname = fullname.trim();
	const re = new RegExp('([^\\s0-9]+)\\s*([^\\s0-9]+)?\\s*([^\\s0-9]+)?');
	const parts = fullname.match(re);
	if (!parts) {
		throw "Invalid fullname";
	}
	if (!parts[3]) {
		parts[3] = parts[2];
		parts[2] = parts[1];
		parts[1] = undefined;
	}
	if (!parts[3]) {
		parts[3] = parts[2];
		parts[2] = parts[1];
		parts[1] = undefined;
	}
	if (parts[0] != fullname) {
		throw "Invalid fullname";
	}
	let name = capitalizeFirstLetter(parts[3]);
	if (name.indexOf('_') !== -1 ) {
		throw "Invalid fullname";
	}
	if (name.indexOf('/') !== -1 ) {
		throw "Invalid fullname";
	}
	if (parts[1]) {
		name += ' ' + capitalizeFirstLetter(parts[1].substr(0,1)) + '.';
	}
	if (parts[2]) {
		name += ' ' + capitalizeFirstLetter(parts[2].substr(0,1)) + '.';
	}
	return name;
}

// console.log(getName(''));
// console.log(getName('Steven Paul Jobs'));
// console.log(getName('Илья Валентинович Сегалович'));
// console.log(getName('Tinna Gunnlaugsdóttir'));
// console.log(getName('Four word full name'));
// console.log(getName('Putin'));

import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', async (req, res) => {
	try {
		const fullname = req.query.fullname || false;
		if (!fullname) {return res.send('Invalid fullname');}
		const name = getName(fullname);
		return res.send(name);
	} catch (err) {
		console.log(err);
		return res.send('Invalid fullname');
	}
});

app.listen(3000, () => {
	console.log('Example app listening on port 3000!');
});
