import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
			<h3>Placeholder do home</h3>
		</div>
	);
}
