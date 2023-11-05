import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import './styles.css';

// import { Component } from 'react';
import { useCallback, useEffect, useState } from 'react';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(0, page + postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect( () => {
    handleLoadPosts(0, postsPerPage)
  }, [handleLoadPosts, postsPerPage])

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts)
    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value)
  }

  const noMorePosts = page + postsPerPage >= allPosts.length;
  const filteredPosts = !!searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    })
    : posts;

  return (
    <section className='container'>
      {!!searchValue && (
        <>
          <h1>Valor para pesquisar: {searchValue}</h1>
        </>
      )
      }

      <div className='container'>
        <TextInput
          onChange={handleChange}
          value={searchValue}
          type="search"
        />
      </div>

      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}

      {filteredPosts.length === 0 && (
        <p>Não existem posts</p>
      )}

      {!searchValue && (
        <div className="container">
          <Button
            text="Load more posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        </div>
      )}
    </section>
  );
}


// ***** Forma longa *****
// constructor(props){
//   super(props);
//   this.state = {
//     name: 'Breno Melo',
//     counter: 0
//   }
//   this.handlePClick = this.handlePClick.bind(this)  
//   // para o método ter acesso ao this
//    Vou tornar a função uma arrow function para facilitar
// }
// class Home extends Component {
//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 20,
//     searchValue: '',
//   };

//   componentDidMount() {
//     this.loadPosts();
//   }

//   loadPosts = async () => {
//     const postsAndPhotos = await loadPosts();
//     const {page, postsPerPage} = this.state
//     console.log(page)
//     this.setState({
//       posts: postsAndPhotos.slice(0, page + postsPerPage),
//       allPosts: postsAndPhotos,
//     });
//   }
  
//   loadMorePosts = () => {
//     console.log('Método loadMorePosts chamado');
//     const {posts, allPosts, postsPerPage, page} = this.state;

//     const nextPage = page + postsPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
//     posts.push(...nextPosts);

//     this.setState({
//       posts, page: nextPage
//     });
//   };

//   handleChange = (e) => {
//     const { value } = e.target;
//     this.setState({ searchValue: value })
//   }

//   render() {
//     const { posts, searchValue, page, postsPerPage, allPosts} = this.state;
//     const noMorePosts = page + postsPerPage >= allPosts.length;

//     const filteredPosts = !!searchValue ?
//       allPosts.filter(post => {
//         return post.title.toLowerCase().includes(
//           searchValue.toLowerCase()
//         );
//       })
//       : posts;

//     return (
//       <section className='container'>
//         {!!searchValue && (
//           <>
//             <h1>Valor para pesquisar: {searchValue}</h1>
//           </>
//         )
//         }

//         <div className='container'>
//           <TextInput
//             onChange={this.handleChange}
//             value={searchValue}
//             type="search"
//           />
//         </div>

//         {filteredPosts.length > 0 && (
//           <Posts posts={filteredPosts} />
//         )}

//         {filteredPosts.length === 0 && (
//           <p>Não existem posts</p>
//         )}

//         {!searchValue && (
//           <div className="container">
//             <Button
//               text="Load more posts"
//               onClick={this.loadMorePosts}
//               disabled={noMorePosts}
//             />
//           </div>
//         )}
//       </section>
//     );
//   }
// }

// export default Home;
