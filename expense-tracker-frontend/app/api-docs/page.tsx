export default function ApiDocs() {
	return (
		<div className='container mx-auto py-32 space-y-12'>
			<header>
				<h1 className='mb-4 text-4xl font-bold'>API Documentation</h1>
				<p className='max-w-2xl text-lg text-muted-foreground'>
					This backend exposes a JWT-protected REST API for
					authenticating with a wallet, managing expenses, and
					updating the user profile.
				</p>
				<p className='mt-4 text-sm text-muted-foreground'>
					Base URL example:{' '}
					<code className='rounded bg-muted px-1 py-0.5'>
						https://backend.example.com
					</code>
					. In the app, this is configured via{' '}
					<code>NEXT_PUBLIC_API_URL</code>.
				</p>
			</header>

			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold'>Health check</h2>
				<p className='text-sm text-muted-foreground'>
					Simple unauthenticated endpoint to verify that the backend
					is running.
				</p>
				<div className='border bg-card p-6'>
					<h3 className='mb-3 text-lg font-medium'>
						Health check – <code>GET /health</code>
					</h3>
					<pre className='overflow-x-auto bg-muted p-4 text-sm'>
						<code>
							{`GET /health

Successful response (200):
{
  "status": "ok"
}`}
						</code>
					</pre>
				</div>
			</section>

			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold'>Authentication</h2>
				<p className='text-sm text-muted-foreground'>
					Authentication is password-less and based on wallet
					signatures. The flow is:
				</p>
				<ol className='ml-6 list-decimal space-y-1 text-sm text-muted-foreground'>
					<li>
						Request a nonce with your wallet address via{' '}
						<code>POST /api/auth/nonce</code>.
					</li>
					<li>
						Sign the nonce in your wallet and send the signature to{' '}
						<code>POST /api/auth/verify</code>.
					</li>
					<li>
						Receive a short-lived JWT and send it as{' '}
						<code>Authorization: Bearer &lt;token&gt;</code> to all
						protected endpoints.
					</li>
				</ol>

				<div className='border bg-card p-6'>
					<h3 className='mb-3 text-lg font-medium'>
						Request nonce – <code>POST /api/auth/nonce</code>
					</h3>
					<pre className='overflow-x-auto bg-muted p-4 text-sm'>
						<code>
							{`POST /api/auth/nonce
Content-Type: application/json

Request body:
{
  "walletAddress": "0xYourWalletAddress"
}

Successful response (200):
{
  "nonce": "random-string-to-sign"
}

Error responses:
- 400: { "error": "walletAddress is required" }`}
						</code>
					</pre>
				</div>

				<div className='border bg-card p-6'>
					<h3 className='mb-3 text-lg font-medium'>
						Verify signature – <code>POST /api/auth/verify</code>
					</h3>
					<pre className='overflow-x-auto bg-muted p-4 text-sm'>
						<code>
							{`POST /api/auth/verify
Content-Type: application/json

Request body:
{
  "walletAddress": "0xYourWalletAddress",
  "signature": "0xSignedNonce"
}

Successful response (200):
{
  "token": "jwt-token"
}

Error responses:
- 400: { "error": "walletAddress and signature are required" }
- 401: { "error": "Signature verification failed" }`}
						</code>
					</pre>
				</div>

				<div className='border bg-card p-6'>
					<h3 className='mb-3 text-lg font-medium'>
						Logout – <code>POST /api/auth/logout</code>
					</h3>
					<p className='mb-3 text-sm text-muted-foreground'>
						Stateless logout endpoint. On the backend this simply
						returns a confirmation message; the client is
						responsible for clearing the JWT locally.
					</p>
					<pre className='overflow-x-auto bg-muted p-4 text-sm'>
						<code>
							{`POST /api/auth/logout

Successful response (200):
{
  "message": "Logged out"
}`}
						</code>
					</pre>
				</div>
			</section>

			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold'>Expenses</h2>
				<p className='text-sm text-muted-foreground'>
					All expense endpoints require a valid JWT in the{' '}
					<code>Authorization: Bearer &lt;token&gt;</code> header.
					Each expense belongs to the authenticated user.
				</p>

				<div className='border bg-card p-6'>
					<h3 className='mb-3 text-lg font-medium'>
						List expenses – <code>GET /api/expenses</code>
					</h3>
					<p className='mb-3 text-sm text-muted-foreground'>
						Supports optional filtering and pagination.
					</p>
					<pre className='overflow-x-auto bg-muted p-4 text-sm'>
						<code>
							{`GET /api/expenses?category=Food&from=2024-01-01&to=2024-12-31&limit=50&offset=0
Authorization: Bearer <token>

Query parameters (all optional):
- category: one of the allowed categories (e.g. "Food", "Bills", ...)
- from: ISO date or yyyy-mm-dd (inclusive start)
- to: ISO date or yyyy-mm-dd (inclusive end)
- limit: integer 1–200 (default depends on backend)
- offset: integer >= 0

Successful response (200):
{
  "expenses": [
    {
      "id": 1,
      "amount": "12.34",
      "category": "Food",
      "note": "Lunch",
      "date": "2024-05-01T12:00:00.000Z"
    }
    // ...
  ]
}

Error responses:
- 401: { "error": "Unauthorized" }
- 400: { "error": "..." } // invalid filters`}
						</code>
					</pre>
				</div>

				<div className='border bg-card p-6'>
					<h3 className='mb-3 text-lg font-medium'>
						Create expense – <code>POST /api/expenses</code>
					</h3>
					<pre className='overflow-x-auto bg-muted p-4 text-sm'>
						<code>
							{`POST /api/expenses
Authorization: Bearer <token>
Content-Type: application/json

Request body:
{
  "amount": "12.34",          // or number, will be normalized
  "category": "Food",         // must be a valid category
  "date": "2024-05-01",       // or full ISO date
  "note": "optional note"     // optional, max 255 chars
}

Successful response (201):
{
  "expense": {
    "id": 1,
    "amount": "12.34",
    "category": "Food",
    "note": "optional note",
    "date": "2024-05-01T12:00:00.000Z"
  }
}

Error responses:
- 401: { "error": "Unauthorized" }
- 400: { "error": "..." } // validation failure`}
						</code>
					</pre>
				</div>

				<div className='border bg-card p-6'>
					<h3 className='mb-3 text-lg font-medium'>
						Get single expense – <code>GET /api/expenses/:id</code>
					</h3>
					<pre className='overflow-x-auto bg-muted p-4 text-sm'>
						<code>
							{`GET /api/expenses/1
Authorization: Bearer <token>

Successful response (200):
{
  "expense": {
    "id": 1,
    "amount": "12.34",
    "category": "Food",
    "note": "optional note",
    "date": "2024-05-01T12:00:00.000Z"
  }
}

Error responses:
- 401: { "error": "Unauthorized" }
- 400: { "error": "Invalid expense id" }
- 404: { "error": "Expense not found" }
- 500: { "error": "Failed to fetch expense" }`}
						</code>
					</pre>
				</div>

				<div className='border bg-card p-6'>
					<h3 className='mb-3 text-lg font-medium'>
						Update expense – <code>PUT /api/expenses/:id</code>
					</h3>
					<p className='mb-3 text-sm text-muted-foreground'>
						At least one field is required in the request body.
					</p>
					<pre className='overflow-x-auto bg-muted p-4 text-sm'>
						<code>
							{`PUT /api/expenses/1
Authorization: Bearer <token>
Content-Type: application/json

Request body (any subset of):
{
  "amount": "15.00",
  "category": "Bills",
  "date": "2024-06-01",
  "note": "updated note"
}

Successful response (200):
{
  "expense": {
    "id": 1,
    "amount": "15.00",
    "category": "Bills",
    "note": "updated note",
    "date": "2024-06-01T12:00:00.000Z"
  }
}

Error responses:
- 401: { "error": "Unauthorized" }
- 400: { "error": "Invalid expense id" } or { "error": "At least one field is required" }
- 404: { "error": "Expense not found" }`}
						</code>
					</pre>
				</div>

				<div className='border bg-card p-6'>
					<h3 className='mb-3 text-lg font-medium'>
						Delete expense – <code>DELETE /api/expenses/:id</code>
					</h3>
					<pre className='overflow-x-auto bg-muted p-4 text-sm'>
						<code>
							{`DELETE /api/expenses/1
Authorization: Bearer <token>

Successful response (200):
{
  "message": "Expense deleted"
}

Error responses:
- 401: { "error": "Unauthorized" }
- 400: { "error": "Invalid expense id" }
- 404: { "error": "Expense not found" }
- 500: { "error": "Failed to delete expense" }`}
						</code>
					</pre>
				</div>
			</section>

			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold'>User profile</h2>
				<p className='text-sm text-muted-foreground'>
					User endpoints also require a valid JWT in the{' '}
					<code>Authorization</code> header.
				</p>

				<div className='border bg-card p-6'>
					<h3 className='mb-3 text-lg font-medium'>
						Get profile – <code>GET /api/user/profile</code>
					</h3>
					<pre className='overflow-x-auto bg-muted p-4 text-sm'>
						<code>
							{`GET /api/user/profile
Authorization: Bearer <token>

Successful response (200):
{
  "profile": {
    "id": 1,
    "walletAddress": "0xYourWalletAddress",
    "name": "Your Name",
    // ...other fields depending on schema
  }
}

Error responses:
- 401: { "error": "Unauthorized" }
- 404: { "error": "User not found" }
- 500: { "error": "Failed to load profile" }`}
						</code>
					</pre>
				</div>

				<div className='border bg-card p-6'>
					<h3 className='mb-3 text-lg font-medium'>
						Update profile – <code>PUT /api/user/profile</code>
					</h3>
					<p className='mb-3 text-sm text-muted-foreground'>
						Currently, only the <code>name</code> field is
						supported.
					</p>
					<pre className='overflow-x-auto bg-muted p-4 text-sm'>
						<code>
							{`PUT /api/user/profile
Authorization: Bearer <token>
Content-Type: application/json

Request body:
{
  "name": "New Name"
}

Successful response (200):
{
  "profile": {
    "id": 1,
    "walletAddress": "0xYourWalletAddress",
    "name": "New Name"
  }
}

Error responses:
- 401: { "error": "Unauthorized" }
- 400: { "error": "..." } // validation failures
- 404: { "error": "User not found" }`}
						</code>
					</pre>
				</div>

				<div className='border bg-card p-6'>
					<h3 className='mb-3 text-lg font-medium'>
						Delete account – <code>DELETE /api/user/account</code>
					</h3>
					<pre className='overflow-x-auto bg-muted p-4 text-sm'>
						<code>
							{`DELETE /api/user/account
Authorization: Bearer <token>

Successful response (200):
{
  "message": "Account deleted"
}

Error responses:
- 401: { "error": "Unauthorized" }
- 404: { "error": "User not found" }
- 500: { "error": "Failed to delete account" }`}
						</code>
					</pre>
				</div>
			</section>
		</div>
	);
}
