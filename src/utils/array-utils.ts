export const getTwoDArray = <T>(array: Array<T>, twoDArraySize: number) => {
	const twoDArray: Array<Array<T>> = [[]];
	let y = 0;
	for (let i = 0; i < array.length; i++) {
		if (twoDArray[y].length === twoDArraySize) {
			y++;
			twoDArray[y] = [];
		}
		twoDArray[y].push(array[i]);
	}
	return twoDArray;
};
