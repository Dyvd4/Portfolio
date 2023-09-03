export const getDataUrl = (file: File) => {
	return new Promise<string>((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = (e) => {
			e.preventDefault();
			resolve(fileReader.result as string);
		};
		fileReader.onerror = (e) => {
			reject();
		};
	});
};
