import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 스타일 상수
const STYLES = {
  container: 'min-h-screen bg-gray-50',
  wrapper: 'max-w-6xl mx-auto px-4 py-8',
  header: 'bg-white rounded-lg shadow-lg p-8 mb-8',
  title: 'text-3xl font-bold text-gray-900 mb-4',
  description: 'text-gray-600 mb-6',
  form: 'bg-white rounded-lg shadow-lg p-8',
  section: 'mb-8',
  sectionTitle: 'text-xl font-bold text-gray-900 mb-4 border-b pb-2',
  input:
    'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all',
  textarea:
    'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-vertical min-h-[120px]',
  button: 'px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium',
  buttonSecondary: 'px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium mr-4',
  table: 'w-full border-collapse border border-gray-300',
  th: 'bg-gray-100 border border-gray-300 px-4 py-3 text-left font-medium text-gray-900',
  td: 'border border-gray-300 px-4 py-3',
  inputCell: 'w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500',
  fileUpload:
    'w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer',
  addButton: 'px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm',
  removeButton: 'px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm',
};

export default function ActivityOverview() {
  const navigate = useNavigate();

  // 상태 관리
  const [formData, setFormData] = useState({
    programContent: '',
    personnel: [
      {
        id: 1,
        type: '전담인력',
        position: '',
        name: '',
        birthDate: '',
        school: '',
        degree: '',
        specialty: '',
        joinDate: '',
      },
    ],
    equipment: [
      {
        id: 1,
        order: 1,
        name: '',
        purpose: '',
        quantity: '',
        comparison: '',
      },
    ],
    files: {
      organizationChart: null,
      trainingOrganization: null,
      trainingFloorPlan: null,
      trainingInteriorPlan: null,
    },
  });

  // 인력 추가
  const addPersonnel = useCallback(() => {
    const newPersonnel = {
      id: Date.now(),
      type: '전담인력',
      position: '',
      name: '',
      birthDate: '',
      school: '',
      degree: '',
      specialty: '',
      joinDate: '',
    };
    setFormData(prev => ({
      ...prev,
      personnel: [...prev.personnel, newPersonnel],
    }));
  }, []);

  // 인력 삭제
  const removePersonnel = useCallback(id => {
    setFormData(prev => ({
      ...prev,
      personnel: prev.personnel.filter(person => person.id !== id),
    }));
  }, []);

  // 인력 정보 업데이트
  const updatePersonnel = useCallback((id, field, value) => {
    setFormData(prev => ({
      ...prev,
      personnel: prev.personnel.map(person => (person.id === id ? { ...person, [field]: value } : person)),
    }));
  }, []);

  // 장비 추가
  const addEquipment = useCallback(() => {
    const newEquipment = {
      id: Date.now(),
      order: formData.equipment.length + 1,
      name: '',
      purpose: '',
      quantity: '',
      comparison: '',
    };
    setFormData(prev => ({
      ...prev,
      equipment: [...prev.equipment, newEquipment],
    }));
  }, [formData.equipment.length]);

  // 장비 삭제
  const removeEquipment = useCallback(id => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.filter(item => item.id !== id),
    }));
  }, []);

  // 장비 정보 업데이트
  const updateEquipment = useCallback((id, field, value) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.map(item => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  }, []);

  // 파일 업로드
  const handleFileUpload = useCallback((fileType, file) => {
    setFormData(prev => ({
      ...prev,
      files: {
        ...prev.files,
        [fileType]: file,
      },
    }));
  }, []);

  // 폼 제출
  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      console.log('Form Data:', formData);
      // 여기에 실제 제출 로직 추가
      alert('첨단산업 인재혁신 활동 개요서가 제출되었습니다.');
    },
    [formData]
  );

  // 뒤로가기
  const handleBack = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  return (
    <div className={STYLES.container}>
      <div className={STYLES.wrapper}>
        {/* 헤더 */}
        <div className={STYLES.header}>
          <h1 className={STYLES.title}>첨단산업 인재혁신 활동 개요서</h1>
          <p className={STYLES.description}>
            교육프로그램 내용, 전담인력, 강의인력, 교육장비 및 관련 서류를 입력해주세요.
          </p>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className={STYLES.form}>
          {/* 교육프로그램 내용 */}
          <div className={STYLES.section}>
            <h2 className={STYLES.sectionTitle}>교육프로그램 내용</h2>
            <textarea
              className={STYLES.textarea}
              placeholder="교육프로그램의 상세 내용을 입력해주세요..."
              value={formData.programContent}
              onChange={e => setFormData(prev => ({ ...prev, programContent: e.target.value }))}
            />
          </div>

          {/* 전담인력과 강의인력 */}
          <div className={STYLES.section}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={STYLES.sectionTitle}>전담인력과 강의인력</h2>
              <button type="button" onClick={addPersonnel} className={STYLES.addButton}>
                인력 추가
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className={STYLES.table}>
                <thead>
                  <tr>
                    <th className={STYLES.th}>구분</th>
                    <th className={STYLES.th}>직위</th>
                    <th className={STYLES.th}>이름</th>
                    <th className={STYLES.th}>생년월일</th>
                    <th className={STYLES.th}>최종학교</th>
                    <th className={STYLES.th}>학위</th>
                    <th className={STYLES.th}>전문분야</th>
                    <th className={STYLES.th}>입사일자</th>
                    <th className={STYLES.th}>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.personnel.map(person => (
                    <tr key={person.id}>
                      <td className={STYLES.td}>
                        <select
                          className={STYLES.inputCell}
                          value={person.type}
                          onChange={e => updatePersonnel(person.id, 'type', e.target.value)}
                        >
                          <option value="전담인력">전담인력</option>
                          <option value="강의인력">강의인력</option>
                        </select>
                      </td>
                      <td className={STYLES.td}>
                        <input
                          type="text"
                          className={STYLES.inputCell}
                          value={person.position}
                          onChange={e => updatePersonnel(person.id, 'position', e.target.value)}
                          placeholder="직위"
                        />
                      </td>
                      <td className={STYLES.td}>
                        <input
                          type="text"
                          className={STYLES.inputCell}
                          value={person.name}
                          onChange={e => updatePersonnel(person.id, 'name', e.target.value)}
                          placeholder="이름"
                        />
                      </td>
                      <td className={STYLES.td}>
                        <input
                          type="date"
                          className={STYLES.inputCell}
                          value={person.birthDate}
                          onChange={e => updatePersonnel(person.id, 'birthDate', e.target.value)}
                        />
                      </td>
                      <td className={STYLES.td}>
                        <input
                          type="text"
                          className={STYLES.inputCell}
                          value={person.school}
                          onChange={e => updatePersonnel(person.id, 'school', e.target.value)}
                          placeholder="최종학교"
                        />
                      </td>
                      <td className={STYLES.td}>
                        <input
                          type="text"
                          className={STYLES.inputCell}
                          value={person.degree}
                          onChange={e => updatePersonnel(person.id, 'degree', e.target.value)}
                          placeholder="학위"
                        />
                      </td>
                      <td className={STYLES.td}>
                        <input
                          type="text"
                          className={STYLES.inputCell}
                          value={person.specialty}
                          onChange={e => updatePersonnel(person.id, 'specialty', e.target.value)}
                          placeholder="전문분야"
                        />
                      </td>
                      <td className={STYLES.td}>
                        <input
                          type="date"
                          className={STYLES.inputCell}
                          value={person.joinDate}
                          onChange={e => updatePersonnel(person.id, 'joinDate', e.target.value)}
                        />
                      </td>
                      <td className={STYLES.td}>
                        <button
                          type="button"
                          onClick={() => removePersonnel(person.id)}
                          className={STYLES.removeButton}
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 교육장비 */}
          <div className={STYLES.section}>
            <div className="flex justify-between items-center mb-4">
              <h2 className={STYLES.sectionTitle}>교육장비</h2>
              <button type="button" onClick={addEquipment} className={STYLES.addButton}>
                장비 추가
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className={STYLES.table}>
                <thead>
                  <tr>
                    <th className={STYLES.th}>순서</th>
                    <th className={STYLES.th}>장비명</th>
                    <th className={STYLES.th}>용도</th>
                    <th className={STYLES.th}>수량</th>
                    <th className={STYLES.th}>비교</th>
                    <th className={STYLES.th}>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.equipment.map(item => (
                    <tr key={item.id}>
                      <td className={STYLES.td}>
                        <input
                          type="number"
                          className={STYLES.inputCell}
                          value={item.order}
                          onChange={e => updateEquipment(item.id, 'order', parseInt(e.target.value))}
                          min="1"
                        />
                      </td>
                      <td className={STYLES.td}>
                        <input
                          type="text"
                          className={STYLES.inputCell}
                          value={item.name}
                          onChange={e => updateEquipment(item.id, 'name', e.target.value)}
                          placeholder="장비명"
                        />
                      </td>
                      <td className={STYLES.td}>
                        <input
                          type="text"
                          className={STYLES.inputCell}
                          value={item.purpose}
                          onChange={e => updateEquipment(item.id, 'purpose', e.target.value)}
                          placeholder="용도"
                        />
                      </td>
                      <td className={STYLES.td}>
                        <input
                          type="text"
                          className={STYLES.inputCell}
                          value={item.quantity}
                          onChange={e => updateEquipment(item.id, 'quantity', e.target.value)}
                          placeholder="수량"
                        />
                      </td>
                      <td className={STYLES.td}>
                        <input
                          type="text"
                          className={STYLES.inputCell}
                          value={item.comparison}
                          onChange={e => updateEquipment(item.id, 'comparison', e.target.value)}
                          placeholder="비교"
                        />
                      </td>
                      <td className={STYLES.td}>
                        <button type="button" onClick={() => removeEquipment(item.id)} className={STYLES.removeButton}>
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 첨부파일 */}
          <div className={STYLES.section}>
            <h2 className={STYLES.sectionTitle}>첨부파일</h2>

            <div className="space-y-6">
              {/* 기업의 조직도 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">기업의 조직도</label>
                <div className={STYLES.fileUpload}>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={e => handleFileUpload('organizationChart', e.target.files[0])}
                    className="hidden"
                    id="organizationChart"
                  />
                  <label htmlFor="organizationChart" className="cursor-pointer block text-center py-4">
                    {formData.files.organizationChart ? (
                      <span className="text-green-600">✓ {formData.files.organizationChart.name}</span>
                    ) : (
                      <span className="text-gray-500">파일을 선택하거나 드래그하여 업로드하세요</span>
                    )}
                  </label>
                </div>
              </div>

              {/* 기업부설 교육훈련기관 조직 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">기업부설 교육훈련기관 조직</label>
                <div className={STYLES.fileUpload}>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={e => handleFileUpload('trainingOrganization', e.target.files[0])}
                    className="hidden"
                    id="trainingOrganization"
                  />
                  <label htmlFor="trainingOrganization" className="cursor-pointer block text-center py-4">
                    {formData.files.trainingOrganization ? (
                      <span className="text-green-600">✓ {formData.files.trainingOrganization.name}</span>
                    ) : (
                      <span className="text-gray-500">파일을 선택하거나 드래그하여 업로드하세요</span>
                    )}
                  </label>
                </div>
              </div>

              {/* 교육훈련부서 전체 도면 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">교육훈련부서 전체 도면</label>
                <div className={STYLES.fileUpload}>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={e => handleFileUpload('trainingFloorPlan', e.target.files[0])}
                    className="hidden"
                    id="trainingFloorPlan"
                  />
                  <label htmlFor="trainingFloorPlan" className="cursor-pointer block text-center py-4">
                    {formData.files.trainingFloorPlan ? (
                      <span className="text-green-600">✓ {formData.files.trainingFloorPlan.name}</span>
                    ) : (
                      <span className="text-gray-500">파일을 선택하거나 드래그하여 업로드하세요</span>
                    )}
                  </label>
                </div>
              </div>

              {/* 교육훈련부서 내부 도면 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">교육훈련부서 내부 도면</label>
                <div className={STYLES.fileUpload}>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={e => handleFileUpload('trainingInteriorPlan', e.target.files[0])}
                    className="hidden"
                    id="trainingInteriorPlan"
                  />
                  <label htmlFor="trainingInteriorPlan" className="cursor-pointer block text-center py-4">
                    {formData.files.trainingInteriorPlan ? (
                      <span className="text-green-600">✓ {formData.files.trainingInteriorPlan.name}</span>
                    ) : (
                      <span className="text-gray-500">파일을 선택하거나 드래그하여 업로드하세요</span>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button type="button" onClick={handleBack} className={STYLES.buttonSecondary}>
              뒤로가기
            </button>
            <button type="submit" className={STYLES.button}>
              제출하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

