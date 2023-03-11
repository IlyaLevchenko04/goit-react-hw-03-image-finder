import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal';
import { Button } from './Button';
import { Loader } from './Loader';
import '../index.css';

export class App extends Component {
  state = {
    q: '',
    apiRespond: [],
    id: null,
    status: 'idle',
    modal: false,
    pageCounter: 1,
    totalHits: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.q.trim() !== prevState.q.trim()) {
      this.setState({ status: 'pending' });
      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${this.state.q}&page=${this.state.pageCounter}&key=32923550-e97d894c3a0a0654cb5be36c1&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(data => data.json())
          .then(data => {
            const hits = data.hits;
            return this.setState(() => {
              return {
                apiRespond: [...hits],
                totalHits: Math.ceil(data.totalHits / 12),
              };
            });
          });
        this.setState({
          status: 'resolved',
          pageCounter: this.state.pageCounter + 1,
        });
      }, 500);
    }
  }

  onSubmit = value => {
    this.setState({ q: value });
  };

  handleModal = () => {
    return this.setState({ modal: !this.state.modal });
  };

  handleId = id => {
    return this.setState({ id });
  };

  handleLoadMore = () => {
    const { totalHits, pageCounter, apiRespond, q } = this.state;

    if (pageCounter <= totalHits) {
      this.setState({
        status: 'pending',
        pageCounter: pageCounter + 1,
      });

      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${q}&page=${pageCounter}&key=32923550-e97d894c3a0a0654cb5be36c1&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(data => data.json())
          .then(data => {
            const hits = data.hits;
            return this.setState(() => {
              return {
                apiRespond: [...apiRespond, ...hits],
              };
            });
          });
        this.setState({ status: 'resolved' });
      }, 500);
    }
  };

  render() {
    const { status, id, modal, q, apiRespond } = this.state;

    if (status === 'idle') {
      return <Searchbar onSubmit={this.onSubmit} />;
    }

    if (status === 'pending') {
      return (
        <>
          <Searchbar onSubmit={this.onSubmit} />
          <ImageGallery
            q={q}
            handleId={this.handleId}
            handleModal={this.handleModal}
            resp={apiRespond}
          ></ImageGallery>
          <Loader />
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <Searchbar onSubmit={this.onSubmit} />
          <ImageGallery
            q={q}
            handleId={this.handleId}
            handleModal={this.handleModal}
            resp={apiRespond}
          ></ImageGallery>{' '}
          {apiRespond && <Button handleLoadMore={this.handleLoadMore} />}
          {modal && <Modal handleModal={this.handleModal} currentId={id} />}
        </>
      );
    }
  }
}
