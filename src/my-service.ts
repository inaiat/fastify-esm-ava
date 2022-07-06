export class MyService {
	public printDateTime(): string {
		return new Date().toISOString()
	}
}
