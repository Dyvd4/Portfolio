export const getGroupedArray = <T>(array: Array<T>, groupSize: number) => {
	const groupedArray: Array<Array<T>> = [[]];
	let y = 0;
	for (let i = 0; i < array.length; i++) {
		if (groupedArray[y].length === groupSize) {
			y++;
			groupedArray[y] = [];
		}
		groupedArray[y].push(array[i]);
	}
	return groupedArray;
};
