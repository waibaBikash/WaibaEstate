import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ListingItem } from '../components/ListingItem';


export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false, 
    offer: false, 
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(()=> {
    const urlParms = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParms.get('searchTerm');
    const typeFromUrl = urlParms.get('type');
    const parkingFromUrl = urlParms.get('parking');
    const furnishedFromUrl = urlParms.get('furnished');
    const offerFromUrl = urlParms.get('offer');
    const sortFromUrl = urlParms.get('sort');
    const orderFromUrl = urlParms.get('order');

    if(
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl 
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'create_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(ture);
      setShowMore(false);
      const searcQuery = urlParms.toString();
      const res = await fetch(`/api/listing/get?
      ${searcQuery}`);
      const data = await res.json();
      if(data.length > 8) {
        setShowMore(true);
      }else{
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };
    fetchListings();
  }, [location.search]);
  const handleChange = (e) => {
    if(
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale' 
    ){
      setSidebardata({
        ...sidebardata,
        type: e.target.id
      });
    }
    if(e.target.id === 'searchTerm'){
      setSidebardata({ ...sidebardata, searchTerm: e.target.value});
    }
    if(
      e.target.id === 'parking' ||
      e.target.id === 'frunished' ||
      e.target.id === 'offer'
    ){
      setSidebardata({ ...sidebardata,
      [e.target.id]:
    e.target.cheched || e.target.cheched === 'true' ?
  true : false,
});
    }
    if(e.target.id === 'sort_order'){
      const sort = e.target.value.split('_')[1] || 'desc';
      sidebardata({ ...sidebardata, sort, order});
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParms = new URLSearchParams();
    urlParms.set('searchTerm', sidebardata.searchTerm);
    urlParms.set('type', sidebardata.type);
    urlParms.set('parking', sidebardata.parking);
    urlParms.set('furnished', sidebardata.furnished);
    urlParms.set('offer', sidebardata.offer);
    urlParms.set('sort', sidebardata.sort);
    urlParms.set('order', sidebardata.order);
    const searchQuery = urlParms.toString();
    navigate(`/search?${searchQuery}`);
  };

    const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlIndex = new URLSearchParams(location.search);
    urlParms.set('startIndex', startIndex);
    const searchQuery = urlParms.toString();
    const res = await fetch(`/api/listing/get?
    ${searchQuery}`);
    const data = await res.json();
    if(data.length < 9){
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  }
  
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowarp font-semibold">
              Search Term:
            </label>
            <input
            type='text'
            id="searchTerm"
            placeholder="search..."
            balue={sidebardata.searchTerm}
            onChange={handleChange}/>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">
              Type:
            </label>
            <div className="flex gap-2">
              <input
              type='checkbox'
              id="all"
              className="w-5"
              onChange={handleChange}
              checked={sidebardata.type === 'all'}/>
              <span>Rent & Sale</span>
              <div className="flex gap-2">
                <input
                type='checkbox'
                id='rent'
                className= 'w-5'
                onChange={handleChange}
                cheched={sidebardata.type === 'rent'}/>
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === 'sale'}/>
                <span>Sale</span>
              </div>
              <div className="flex gap-2">
                <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.offer}/>
                <span>Offer</span>
              </div>
            </div>
              <div className="flex gap-2 flex-wrap items-center">
                <label className="font-semibold">Amenities:</label>
                <div className="flex gap2">
                <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.parking}/>
                <span>Parking</span>
              </div>
              <div className="flex gap-2">
                <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.furnished}/>
                <span>Furnished</span>
              </div>
             </div>
             <div className="flex items-center gap-2">
              <lable className='font-semibold'>Sort:</lable>
              <select 
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id="sort_order"
              className="border rounded-lg p-3">
                <option value='regularPrice_desc'>Price high to low</option>
                <option value='regularPrice_asc'>Price low to high</option>
                <option value='createdAt_desc'>Latest</option>
                <option value='createdAt_asc'>Oldest</option>
              </select>
             </div>
             <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
              Search
             </button>
            </form>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-semibold border-b p-3 text-slate-700">
              Listing results:
            </h1>
             <div className="p-7 flex flex-wrap gap-4">
                {!loading && listings.length === 0 && (
                  <p className="text-xl textslate700">No listing found!</p>
                )}
                { loading && (
                  <p className="text-xl textslate700 text-center w-full">Loading...</p>
                )}
                   {!loading && 
                   listings &&
                   listings.map((listing)=>(
                    <ListingItem key={listing._id} listing = {listing} />
                ))}
                  {showMore && (
                    <button onClick={onShowMoreClick}
                    className="text-green-700 hover:underline p-7 text-center w-full">
                      Show more
                    </button>
                  )}
            </div>
      </div>
  </div>
  );
}
