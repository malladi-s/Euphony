import React from 'react';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';

const formatAlbum = (album) => {
    if (!album) {
        return null;
    }

    return (
        <span className="text-center">
            <img src={album.thumb} alt="album thumb" /><br />
            {album.title}
        </span>
    );
};

export default function Sidebar(props) {
    const { latestAlbum } = props;
    return (
        <aside className="col-sm-12 col-lg-4">
            <Card>
                <CardBody>
                    <CardTitle className="text-center">Latest Album</CardTitle>
                    <CardText className="text-center">
                        {latestAlbum && latestAlbum.title ? formatAlbum(latestAlbum) : null}
                    </CardText>
                </CardBody>
            </Card>
        </aside>
    )
}