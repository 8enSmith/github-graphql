import React from "react";
import { Query } from "react-apollo";
import Displayrepos from "./display-repos";
import { reposQuery } from "./queries";

const Myrepositories: React.FC = () => {
    const handleMore = (data, fetchMore, current) => {
        fetchMore({
            variables: { first: current + 10 },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                    return prev;
                }
                return Object.assign(prev, fetchMoreResult);
            }
        });
    };

    return (
        <Query query={reposQuery} variables={{ first: 10 }}>
            {({ data, loading, error, fetchMore, refetch }) => {
                if (loading) return <p>loading...</p>;
                if (error) return <p>{error.message}</p>;

                let current = data.viewer.repositories.edges.length;

                return (
                    <Displayrepos
                        current={current}
                        refetch={refetch}
                        data={data}
                        handleMore={() => handleMore(data, fetchMore, current)}
                    />
                );
            }}
        </Query>
    );
}

export default Myrepositories;