export function GET() {
  return new Response(
    "google.com, pub-7779972504314593, DIRECT, f08c47fec0942fa0",
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
}
