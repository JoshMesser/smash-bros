export default {

	outputDate( date ) {
		const d = new Date(date);
		const m = d.getMonth();
		const day = d.getDate();
		const y = d.getFullYear();

		return `${m}-${day}-${y}`;
	}

};