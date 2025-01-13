import TestIntrospectButton from "@/components/TemporaryIntrospectTest";

export default function TestPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-muted p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-3xl flex justify-center">
				<TestIntrospectButton/>
			</div>
		</div>
	);
}
