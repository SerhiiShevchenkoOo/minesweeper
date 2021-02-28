module.exports = {
	purge: false,
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			gridTemplateColumns: {
				16: 'repeat(16, minmax(30px, 30px))',
				30: 'repeat(30, minmax(25px, 25px))',
				9: 'repeat(9, minmax(30px, 30px))',
				'16t': 'repeat(16, minmax(45px, 45px))',
				'30t': 'repeat(30, minmax(45px, 45px))',
				'9t': 'repeat(9, minmax(45px, 45px))',
				'5t': 'repeat(5, minmax(80px, 1fr))',
			},
			gridAutoRows: {
				1: '30px',
				2: '25px',
				t: '45px',
			},
		},
		maxHeight: {
			'3/4': '75%',
		},
	},
	variants: {
		extend: {
			scale: ['active', 'group-hover'],
		},
	},
	plugins: [],
};
