
"use client";
import React, { useState } from 'react';
import Modal from './Modal';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <>
    <div>
      <button onClick={()=>{
        setIsModalOpen(true);
      }}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="gridgrid-item_1_icon">かお</div>
        <div className="gridgrid-item_2_profile1">なまえ</div>
        <div className="gridgrid-item_3_profile2">キャンセル</div>
      </Modal>
    </div>
    <div>
      
    </div>
    </>
  );
};

export default App;
