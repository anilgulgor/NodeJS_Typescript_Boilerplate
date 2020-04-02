import f from 'figlet';

f(process.env.ENV, (err: any, data: any) => {
	if (err) return console.log(`Something went wrong. Error: ${err}`);
	console.log(data);
});
