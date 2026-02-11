'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import DashboardHeader from '@/components/dashboard/dashboard-header';
import AuthGuard from '@/components/auth/AuthGuard';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

type Expense = {
	id: number;
	amount: string;
	category: string;
	note: string | null;
	date: string;
};

const categories = [
	'Food',
	'Bills',
	'Transport',
	'Entertainment',
	'Utilities',
	'Other',
];

const createCurrencyFormatter = () =>
	new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});

const formatDateInput = (value: string) => {
	if (!value) return '';
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return '';
	return date.toISOString().slice(0, 10);
};

export default function Dashboard() {
	const [expenses, setExpenses] = useState<Expense[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const [saving, setSaving] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [page, setPage] = useState(1);
	const pageSize = 50;
	const abortRef = useRef<AbortController | null>(null);
	const currencyFormatter = useMemo(() => createCurrencyFormatter(), []);
	const [filters, setFilters] = useState({
		category: '',
		from: '',
		to: '',
	});
	const [formValues, setFormValues] = useState({
		amount: '',
		category: 'Food',
		date: new Date().toISOString().slice(0, 10),
		note: '',
	});

	const loadExpenses = async (nextFilters = filters) => {
		abortRef.current?.abort();
		const controller = new AbortController();
		abortRef.current = controller;

		setLoading(true);
		setError(null);
		try {
			const params = new URLSearchParams();
			if (nextFilters.category)
				params.set('category', nextFilters.category);
			if (nextFilters.from) params.set('from', nextFilters.from);
			if (nextFilters.to) params.set('to', nextFilters.to);

			const query = params.toString();
			const response = await api(
				`/api/expenses${query ? `?${query}` : ''}`,
				{ signal: controller.signal }
			);
			if (!controller.signal.aborted) {
				const nextExpenses = (response.expenses ?? []) as Expense[];
				setExpenses(nextExpenses);
				setPage(1);
			}
		} catch (err) {
			if (err instanceof Error && err.name === 'AbortError') {
				return;
			}
			setError(
				err instanceof Error ? err.message : 'Failed to load expenses'
			);
		} finally {
			if (!controller.signal.aborted) {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		loadExpenses(filters);
		return () => abortRef.current?.abort();
	}, [filters.category, filters.from, filters.to]);

	const pagedExpenses = useMemo(() => {
		const start = (page - 1) * pageSize;
		return expenses.slice(start, start + pageSize);
	}, [expenses, page]);

	const totalPages = useMemo(() => {
		return Math.max(1, Math.ceil(expenses.length / pageSize));
	}, [expenses.length]);

	const totals = useMemo(() => {
		const total = expenses.reduce(
			(sum, expense) => sum + Number.parseFloat(expense.amount),
			0
		);

		const now = new Date();
		const month = now.getMonth();
		const year = now.getFullYear();
		const monthTotal = expenses.reduce((sum, expense) => {
			const date = new Date(expense.date);
			if (date.getMonth() === month && date.getFullYear() === year) {
				return sum + Number.parseFloat(expense.amount);
			}
			return sum;
		}, 0);

		return { total, monthTotal };
	}, [expenses]);

	const resetForm = () => {
		setFormValues({
			amount: '',
			category: 'Food',
			date: new Date().toISOString().slice(0, 10),
			note: '',
		});
		setEditingId(null);
	};

	const validateForm = () => {
		if (!formValues.amount || Number.isNaN(Number(formValues.amount))) {
			return 'Amount must be a valid number';
		}
		if (Number(formValues.amount) <= 0) {
			return 'Amount must be greater than zero';
		}
		if (!formValues.category) {
			return 'Category is required';
		}
		if (!formValues.date) {
			return 'Date is required';
		}
		if (formValues.note.length > 255) {
			return 'Description is too long';
		}
		return null;
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setSuccess(null);
		const validationError = validateForm();
		if (validationError) {
			setError(validationError);
			return;
		}

		setSaving(true);
		setError(null);
		try {
			const payload = {
				amount: formValues.amount,
				category: formValues.category,
				date: formValues.date,
				note: formValues.note || null,
			};

			if (editingId) {
				await api(`/api/expenses/${editingId}`, {
					method: 'PUT',
					body: JSON.stringify(payload),
				});
				setSuccess('Expense updated successfully.');
			} else {
				await api('/api/expenses', {
					method: 'POST',
					body: JSON.stringify(payload),
				});
				setSuccess('Expense added successfully.');
			}

			resetForm();
			setShowForm(false);
			await loadExpenses(filters);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Failed to save expense'
			);
		} finally {
			setSaving(false);
		}
	};

	const handleEdit = (expense: Expense) => {
		setEditingId(expense.id);
		setShowForm(true);
		setFormValues({
			amount: expense.amount,
			category: expense.category,
			date: formatDateInput(expense.date),
			note: expense.note ?? '',
		});
		setError(null);
		setSuccess(null);
	};

	const handleDelete = async (expenseId: number) => {
		const confirmed = window.confirm('Delete this expense?');
		if (!confirmed) return;
		setSaving(true);
		setError(null);
		setSuccess(null);
		try {
			await api(`/api/expenses/${expenseId}`, { method: 'DELETE' });
			setSuccess('Expense deleted.');
			await loadExpenses(filters);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : 'Failed to delete expense'
			);
		} finally {
			setSaving(false);
		}
	};

	return (
		<AuthGuard>
			<div className='min-h-screen bg-background text-foreground'>
				<DashboardHeader />
				<main className='mx-auto w-full max-w-5xl space-y-10 px-6 py-12'>
					<section className='grid gap-6 sm:grid-cols-2'>
						<Card>
							<CardHeader className='pb-3'>
								<CardTitle className='text-base font-medium'>
									Total spent
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-3xl font-bold'>
									{currencyFormatter.format(totals.total)}
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className='pb-3'>
								<CardTitle className='text-base font-medium'>
									This month
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-3xl font-bold'>
									{currencyFormatter.format(
										totals.monthTotal
									)}
								</p>
							</CardContent>
						</Card>
					</section>

					<Card>
						<CardHeader className='pb-4'>
							<div className='flex flex-wrap items-center justify-between gap-4'>
								<CardTitle>Expenses</CardTitle>
								<Button
									onClick={() => setShowForm((prev) => !prev)}
									size='sm'
								>
									{showForm ? 'Close form' : 'Add Expense'}
								</Button>
							</div>
						</CardHeader>
						<CardContent className='space-y-6'>
							<div className='grid gap-4 md:grid-cols-3'>
								<div className='space-y-2'>
									<Label
										htmlFor='category'
										className='text-xs'
									>
										Category
									</Label>
									<Select
										value={filters.category}
										onValueChange={(value) =>
											setFilters((prev) => ({
												...prev,
												category: value,
											}))
										}
									>
										<SelectTrigger id='category'>
											<SelectValue placeholder='All' />
										</SelectTrigger>
										<SelectContent>
											{categories.map((category) => (
												<SelectItem
													key={category}
													value={category}
												>
													{category}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='from' className='text-xs'>
										From
									</Label>
									<Input
										id='from'
										type='date'
										value={filters.from}
										onChange={(
											event: React.ChangeEvent<HTMLInputElement>
										) =>
											setFilters((prev) => ({
												...prev,
												from: event.target.value,
											}))
										}
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='to' className='text-xs'>
										To
									</Label>
									<Input
										id='to'
										type='date'
										value={filters.to}
										onChange={(
											event: React.ChangeEvent<HTMLInputElement>
										) =>
											setFilters((prev) => ({
												...prev,
												to: event.target.value,
											}))
										}
									/>
								</div>
							</div>

							{showForm ? (
								<form
									onSubmit={handleSubmit}
									className='border bg-muted/30 p-6 space-y-4'
								>
									<div className='grid gap-4 md:grid-cols-2'>
										<div className='space-y-2'>
											<Label
												htmlFor='amount'
												className='text-xs'
											>
												Amount
											</Label>
											<Input
												id='amount'
												type='number'
												step='0.01'
												value={formValues.amount}
												onChange={(
													event: React.ChangeEvent<HTMLInputElement>
												) =>
													setFormValues((prev) => ({
														...prev,
														amount: event.target
															.value,
													}))
												}
												placeholder='0.00'
												required
											/>
										</div>
										<div className='space-y-2'>
											<Label
												htmlFor='form-category'
												className='text-xs'
											>
												Category
											</Label>
											<Select
												value={formValues.category}
												onValueChange={(value) =>
													setFormValues((prev) => ({
														...prev,
														category: value,
													}))
												}
											>
												<SelectTrigger id='form-category'>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													{categories.map(
														(category) => (
															<SelectItem
																key={category}
																value={category}
															>
																{category}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
										</div>
										<div className='space-y-2'>
											<Label
												htmlFor='date'
												className='text-xs'
											>
												Date
											</Label>
											<Input
												id='date'
												type='date'
												value={formValues.date}
												onChange={(
													event: React.ChangeEvent<HTMLInputElement>
												) =>
													setFormValues((prev) => ({
														...prev,
														date: event.target
															.value,
													}))
												}
												required
											/>
										</div>
										<div className='space-y-2'>
											<Label
												htmlFor='note'
												className='text-xs'
											>
												Description
											</Label>
											<Input
												id='note'
												type='text'
												value={formValues.note}
												onChange={(
													event: React.ChangeEvent<HTMLInputElement>
												) =>
													setFormValues((prev) => ({
														...prev,
														note: event.target
															.value,
													}))
												}
												maxLength={255}
												placeholder='Optional'
											/>
										</div>
									</div>
									<div className='flex flex-wrap items-center gap-3 pt-2'>
										<Button
											type='submit'
											disabled={saving}
											size='sm'
										>
											{saving
												? 'Saving...'
												: editingId
													? 'Update Expense'
													: 'Add Expense'}
										</Button>
										{editingId ? (
											<Button
												type='button'
												variant='outline'
												size='sm'
												onClick={() => {
													resetForm();
													setShowForm(false);
												}}
											>
												Cancel
											</Button>
										) : null}
									</div>
								</form>
							) : null}

							{error ? (
								<p className='text-sm text-red-500'>{error}</p>
							) : null}
							{success ? (
								<p className='text-sm text-emerald-500'>
									{success}
								</p>
							) : null}

							{!loading && expenses.length > pageSize ? (
								<div className='flex flex-wrap items-center justify-between gap-4 border-t pt-6'>
									<p className='text-sm text-muted-foreground'>
										Showing {(page - 1) * pageSize + 1}-
										{Math.min(
											page * pageSize,
											expenses.length
										)}{' '}
										of {expenses.length}
									</p>
									<div className='flex items-center gap-2'>
										<Button
											type='button'
											variant='outline'
											size='sm'
											onClick={() =>
												setPage((p) =>
													Math.max(1, p - 1)
												)
											}
											disabled={page <= 1}
										>
											Prev
										</Button>
										<span className='text-sm text-muted-foreground'>
											Page {page} / {totalPages}
										</span>
										<Button
											type='button'
											variant='outline'
											size='sm'
											onClick={() =>
												setPage((p) =>
													Math.min(totalPages, p + 1)
												)
											}
											disabled={page >= totalPages}
										>
											Next
										</Button>
									</div>
								</div>
							) : null}

							<div className='overflow-x-auto border-t pt-6'>
								{loading ? (
									<p className='text-sm text-muted-foreground'>
										Loading expenses…
									</p>
								) : expenses.length === 0 ? (
									<p className='text-sm text-muted-foreground'>
										No expenses yet. Add your first one
										above.
									</p>
								) : (
									<table className='w-full min-w-[520px] border-collapse text-sm'>
										<thead>
											<tr className='border-b text-left text-xs uppercase text-muted-foreground'>
												<th className='py-3 px-0'>
													Date
												</th>
												<th className='py-3 px-0'>
													Category
												</th>
												<th className='py-3 px-0'>
													Amount
												</th>
												<th className='py-3 px-0 text-right'>
													Actions
												</th>
											</tr>
										</thead>
										<tbody>
											{pagedExpenses.map((expense) => (
												<tr
													key={expense.id}
													className='border-b'
												>
													<td className='py-4 px-0'>
														{new Date(
															expense.date
														).toLocaleDateString()}
													</td>
													<td className='py-4 px-0'>
														{expense.category}
													</td>
													<td className='py-4 px-0'>
														{currencyFormatter.format(
															Number.parseFloat(
																expense.amount
															)
														)}
													</td>
													<td className='py-4 px-0 text-right'>
														<div className='flex justify-end gap-2'>
															<Button
																size='sm'
																variant='outline'
																onClick={() =>
																	handleEdit(
																		expense
																	)
																}
															>
																Edit
															</Button>
															<Button
																size='sm'
																variant='destructive'
																onClick={() =>
																	handleDelete(
																		expense.id
																	)
																}
																disabled={
																	saving
																}
															>
																Delete
															</Button>
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								)}
							</div>
						</CardContent>
					</Card>
				</main>
			</div>
		</AuthGuard>
	);
}
