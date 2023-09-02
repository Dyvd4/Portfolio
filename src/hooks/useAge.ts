import dayjs from "dayjs";
import dayJsDurationPlugin from "dayjs/plugin/duration";

dayjs.extend(dayJsDurationPlugin);

const BIRTHDAY_IN_ISO8601 = "2004-04-08";

/** completely unnecessary hook for calculating the age of David Kimmich. */
const useAge = () => {
	const birthday = dayjs(BIRTHDAY_IN_ISO8601);
	const age = Math.floor(dayjs.duration(dayjs().diff(birthday)).asYears());

	return age;
};

export default useAge;
