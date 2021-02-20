module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			gridTemplateColumns: {
				16: 'repeat(16, minmax(0, 1fr))',
				30: 'repeat(30, minmax(0, 1fr))',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
