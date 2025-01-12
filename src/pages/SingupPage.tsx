import RegisterForm from "@/components/RegisterForm";

export default function SingupPage() {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-3xl">
				<RegisterForm></RegisterForm>
			</div>
		</div>
	);
}
