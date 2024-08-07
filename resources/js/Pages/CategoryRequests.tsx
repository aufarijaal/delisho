import { Head, Link, router, useForm } from "@inertiajs/react";
import React from "react";
import { Button, Input, Pagination, Table, Tooltip } from "react-daisyui";
import JsonViewer from "@andypf/json-viewer/dist/esm/react/JsonViewer";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

interface TableHeadCellProps {
    label: string;
    direction?: "asc" | "desc";
    sortBy?: string;
    currentSortColumn?: string;
    args: any;
}

function TableHeadCell({
    label,
    direction,
    sortBy,
    currentSortColumn,
    ...args
}: TableHeadCellProps) {
    const isSorted = currentSortColumn === sortBy;
    const iconDirection = isSorted ? direction : undefined;

    return (
        <span className="flex items-center gap-1 cursor-pointer" {...args}>
            {label}
            {iconDirection && (
                <Icon
                    className="text-accent"
                    icon={
                        iconDirection === "asc"
                            ? "teenyicons:up-small-solid"
                            : "teenyicons:down-small-solid"
                    }
                    width="16"
                />
            )}
        </span>
    );
}

function CategoryRequests({ auth, categories, params }: any) {
    const { data, setData, get } = useForm({
        q: params.q ?? "",
        sortBy: params.sortBy ?? "",
        shows: params.shows ?? "all", // all, accepted, pending,
        direction: params.direction ?? "asc",
    });

    function handleSearch(e: any) {
        e.preventDefault();
        get(`/category-requests`);
    }

    function go(param: Record<string, string>) {
        router.get(`/category-requests`, {
            ...data,
            ...param,
        });
    }

    return (
        <main className="min-h-screen bg-[#f8f6f2] flex flex-col gap-2 items-center px-4 py-20">
            <Head title="List of category requests" />

            <div className="flex flex-col items-center gap-2 mb-6 max-w-md">
                <div>
                    <Link href="/">
                        <img src="logo.svg" className="w-[40px] h-[40px]" />
                    </Link>
                </div>
                <div className="font-bold text-xl">Requested Categories</div>
                <p className="text-sm text-zinc-500 text-center">
                    Below is the list of the requested categories by users, you
                    can filter it by the pending or the accpeted ones
                </p>
                <Link
                    href="/category-requests/make"
                    className="btn btn-xs btn-accent"
                >
                    Request a category
                </Link>
            </div>

            {/* <JsonViewer data={params} /> */}

            <div className="max-w-5xl mx-auto w-full">
                <div className="mb-2 flex items-center">
                    <div className="flex-1">
                        <form
                            onSubmit={handleSearch}
                            className="flex items-center gap-1"
                        >
                            <Input
                                size="sm"
                                placeholder="Search a category"
                                value={data.q}
                                onInput={(e) =>
                                    setData({
                                        ...data,
                                        q: e.currentTarget.value,
                                    })
                                }
                            />
                            <Button size="sm" color="accent" shape="square">
                                <Icon icon="mingcute:search-line" width="20" />
                            </Button>
                        </form>
                    </div>
                    <div className="flex-none">
                        <div className="bg-base-100 p-2 rounded-lg space-x-2">
                            <Button
                                size="sm"
                                color={
                                    data.shows === "all" || !data.shows
                                        ? "accent"
                                        : "ghost"
                                }
                                onClick={() => {
                                    go({
                                        shows: "all",
                                    });
                                }}
                            >
                                All
                            </Button>
                            <Button
                                size="sm"
                                color={
                                    data.shows === "accepted"
                                        ? "accent"
                                        : "ghost"
                                }
                                onClick={() => {
                                    go({
                                        shows: "accepted",
                                    });
                                }}
                            >
                                Accepted
                            </Button>
                            <Button
                                size="sm"
                                color={
                                    data.shows === "pending"
                                        ? "accent"
                                        : "ghost"
                                }
                                onClick={() => {
                                    go({
                                        shows: "pending",
                                    });
                                }}
                            >
                                Pending
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow-sm w-full">
                    <Table>
                        <Table.Head>
                            <TableHeadCell
                                label="Name"
                                sortBy="name"
                                currentSortColumn={data.sortBy}
                                direction={data.direction}
                                onClick={() => {
                                    go({
                                        sortBy: "name",
                                        direction:
                                            data.direction === "asc"
                                                ? "desc"
                                                : "asc",
                                    });
                                }}
                            />
                            <TableHeadCell
                                label="Requestor"
                                sortBy="requestor"
                                currentSortColumn={data.sortBy}
                                direction={data.direction}
                                onClick={() => {
                                    go({
                                        sortBy: "requestor",
                                        direction:
                                            data.direction === "asc"
                                                ? "desc"
                                                : "asc",
                                    });
                                }}
                            />
                            <TableHeadCell
                                label="Created at"
                                sortBy="createdAt"
                                currentSortColumn={data.sortBy}
                                direction={data.direction}
                                onClick={() => {
                                    go({
                                        sortBy: "createdAt",
                                        direction:
                                            data.direction === "asc"
                                                ? "desc"
                                                : "asc",
                                    });
                                }}
                            />
                        </Table.Head>

                        <Table.Body>
                            {categories.data.map((category) => (
                                <Table.Row>
                                    <span title="Ad aspernatur est quasi quasi qui delectus maxime adipisci. Iusto est atque ea. Nesciunt aut est et nemo nihil possimus aut.">
                                        {category.name}
                                    </span>
                                    <span>
                                        {category.requestor
                                            ? category.requestor.name
                                            : "-"}
                                    </span>
                                    <span>{category.created_at ?? "-"}</span>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>

                <div className="mt-6 flex justify-center">
                    <Pagination>
                        {categories.links.map((item, i) => (
                            <Link
                                href={item.url}
                                className={`join-item btn btn-sm btn-accent btn-outline ${
                                    item.active ? "btn-active" : ""
                                } ${item.url ? "" : "btn-disabled"}`}
                                key={i}
                            >
                                {item.label
                                    .replace("&laquo;", "")
                                    .replace("&raquo;", "")}
                            </Link>
                        ))}
                    </Pagination>
                </div>
            </div>
        </main>
    );
}

export default CategoryRequests;
