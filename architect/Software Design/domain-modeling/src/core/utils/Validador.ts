/** biome-ignore-all lint/complexity/noStaticOnlyClass: Course  */
export default class Validador {
	static isEmailValido(email: string): boolean {
		const regex =
			/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
		return regex.test(email);
	}
}
